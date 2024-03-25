require 'stripe'

class Api::OrdersController < ApplicationController
    before_action :require_logged_in

    def index
        @user = User.find(params[:user_id])
        @orders = Booking
                    .where("(status='paid' OR status='completed') AND user_id=?", @user.id)
                    .order(created_at: :desc)
                    .limit(10)

        # vendor_ids = @orders.pluck(:vendor_id).uniq   
        # @vendors = Vendor.where(id: vendor_ids)         
        render :index
    end

    # def charge_customer
    #     total_amount = calculate_total_amount
    #     render json: {error: 'potential price forgery: price cannot be verified'}, status: :unprocessable_entity and return unless total_amount
    #     total_amount_in_cents = (total_amount * 100).to_i

    #     user = User.find(booking_params[:user_id])
    #     payment_method = booking_params[:payment_method_id]
    #     customer_id = booking_params[:stripe_customer_id]
    #     return_url = booking_params[:return_url]

    #     render json: "Unauthorized user" unless customer_id == @current_user.stripe_customer_id

    #     begin
    #       # Charge the customer and payment method immediately
    #       payment_intent = Stripe::PaymentIntent.create(
    #         amount: total_amount_in_cents,
    #         currency: 'usd',
    #         customer: user.stripe_customer_id,
    #         payment_method: payment_method,
    #         off_session: false,
    #         confirm: true,
    #         return_url: return_url
    #       )
    #     #   render json: { clientSecret: payment_intent.client_secret, price: price}
    #     rescue Stripe::CardError => e
    #       # Error code will be authentication_required if authentication is needed
    #       puts "Error is: \#{e.error.code}"
    #       payment_intent_id = e.error.payment_intent.id
    #       payment_intent = Stripe::PaymentIntent.retrieve(payment_intent_id)
    #       puts payment_intent.id
    #     end
    # end

    def create_payment_intent
        total_amount = calculate_total_amount # Verify price before continuing
        render json: {error: 'potential price forgery: price cannot be verified'}, status: :unprocessable_entity and return unless total_amount
        total_amount_in_cents = (total_amount * 100).to_i
        payment_methods = []
        return_customer = false

        user = User.find(booking_params[:user_id])

        if !user.stripe_customer_id # Create stripe customer id if needed
            customer = Stripe::Customer.create(name: "#{user.first_name} #{user.last_name}", email: "#{user.email}")
            user.update(stripe_customer_id: customer[:id])
        else
            payment_methods = get_payment_methods(user) # Get payment methods (if any) if return customer
        end

        vendor = Vendor.find(booking_params[:vendor_id]) # Used for statement descriptor

        options = {
            amount: total_amount_in_cents,
            currency: 'usd',
            customer: user.stripe_customer_id,
            statement_descriptor: "SERVO | #{vendor.name.slice(0,14)}",
            metadata: {booking_id: booking_params[:id]},
            setup_future_usage: 'on_session'
        }

        # Add conditional options based on the presence of payment methods
        if payment_methods.empty?
            # options.merge!(setup_future_usage: 'on_session')
        else
            return_customer = true
        end

        begin
            intent = Stripe::PaymentIntent.create(options)
            response = {
                clientSecret: intent.client_secret, price: total_amount, paymentMethods: payment_methods
            }
            render json: response
        rescue Stripe::StripeError => e 
            render json: { error: e.message }, status: 422
        end
    end

    private 
    def calculate_total_amount
        price = booking_params[:price].to_f

        if valid_price?(price)
            return price + ENV["SERVO_SERVICE_CHARGE"].to_f
        else
            return nil
        end
    end

    def valid_price?(price)
        @booking = Booking.find(booking_params[:id])
        price == @booking.price
    end

    def booking_params
        params.require(:booking).permit(:price, :id, :user_id, :vendor_id, :payment_method_id, :return_url)
    end

    # def charge_params
    #     params.require(:charge).permit(:payment_method_id, :stripe_customer_id, :price, :return_url)
    # end

    def order_params
        params.require(:order).permit(:user_id, :total, :vendor_id)
    end

    def get_payment_methods(user)
        user.stripe_customer_id
        payment_methods = Stripe::PaymentMethod.list(
                customer: user.stripe_customer_id,
                type: 'card'
        )
        return payment_methods.data
    end
end