class Api::PaymentsController < ApplicationController
    def create
        booking = params[:booking]
        vendor = Vendor.find(booking.vendor_id)
        total_amount = calculate_total_amount(booking)
        total_amount_in_cents = (total_amount * 100).to_i
        
        begin
            intent = Stripe::PaymentIntent.create({
                amount: total_amount_in_cents,
                currency: 'usd',
                statement_descriptor_suffix: " - " + vendor.name.slice(0, 14)
            })

            render json: { client_secret: intent.client_secret }
        rescue Stripe::StripeError => e 
            render json: { error: e.message }, status: 404
        end
    end

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
            statement_descriptor: "SERVO #{vendor.name.slice(0,16)}",
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
    def calculate_total_amount(booking)
        booking.price
    end

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
