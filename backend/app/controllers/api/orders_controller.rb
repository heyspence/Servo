require 'stripe'

class Api::OrdersController < ApplicationController
    before_action :require_logged_in

    def index
        @user = User.find(params[:user_id])
        @orders = Booking
                    .where("(status='paid' OR status='completed') AND user_id=?", @user.id)
                    .order(created_at: :desc)
                    .limit(10)
        render :index
    end

    def charge_customer
        # # Lookup the payment methods available for the customer
        # payment_methods = Stripe::PaymentMethod.list(
        #   customer: customerId,
        #   type: 'card'
        # )
        payment_method = charge_params[:payment_method_id]
        customer_id = charge_params[:stripe_customer_id]
        price = (charge_params[:price].to_f * 100).to_i

        render json: "Unauthorized user" unless customer_id == @current_user.stripe_customer_id

        begin
          # Charge the customer and payment method immediately
          payment_intent = Stripe::PaymentIntent.create(
            amount: price,
            currency: 'usd',
            customer: customer_id,
            payment_method: payment_method,
            off_session: false,
            confirm: true
          )
        rescue Stripe::CardError => e
          # Error code will be authentication_required if authentication is needed
          puts "Error is: \#{e.error.code}"
          payment_intent_id = e.error.payment_intent.id
          payment_intent = Stripe::PaymentIntent.retrieve(payment_intent_id)
          puts payment_intent.id
        end
    end

    def get_payment_methods
        user = User.find(params[:user_id])
        if user.stripe_customer_id
            payment_methods = Stripe::PaymentMethod.list(
                    customer: user.stripe_customer_id,
                    type: 'card'
            )
            render json: payment_methods
        else
            render errors: {message: 'User is not a return customer or does not have payment info saved'}, status: 422
        end
    end

    def create_payment_intent
        total_amount = calculate_total_amount
        render json: {error: 'potential price forgery: price cannot be verified'}, status: :unprocessable_entity and return unless total_amount
        total_amount_in_cents = (total_amount * 100).to_i

        user = User.find(booking_params[:user_id])

        if(!user.stripe_customer_id)
            customer = Stripe::Customer.create(name: "#{user.first_name} #{user.last_name}", email: "#{user.email}")
            user.update(stripe_customer_id: customer[:id])
        end

        vendor = Vendor.find(booking_params[:vendor_id])

        begin
            intent = Stripe::PaymentIntent.create({
                amount: total_amount_in_cents,
                currency: 'usd',
                customer: user.stripe_customer_id,
                setup_future_usage: 'on_session',
                statement_descriptor: "SERVO | #{vendor.name.slice(0,14)}",
                metadata: {booking_id: booking_params[:id]}
            })

            render json: { clientSecret: intent.client_secret, price: total_amount }
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
        params.require(:booking).permit(:price, :id, :user_id, :vendor_id)
    end

    def charge_params
        params.require(:charge).permit(:payment_method_id, :stripe_customer_id, :price)
    end

    def order_params
        params.require(:order).permit(:user_id, :total, :vendor_id)
    end
end