require 'stripe'

class Api::OrdersController < ApplicationController
    def index
        @user = User.find(params[:user_id])
        @orders = Booking
                    .where("(status='paid' OR status='completed') AND user_id=?", @user.id)
                    .order(created_at: :desc)
                    .limit(10)
        render :index
    end

    def create_payment_intent
        total_amount = calculate_total_amount
        render json: {error: 'potential price forgery: price cannot be verified'}, status: :unprocessable_entity and return unless total_amount
        total_amount_in_cents = (total_amount * 100).to_i

        begin
            intent = Stripe::PaymentIntent.create({
                amount: total_amount_in_cents,
                currency: 'usd',
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
        params.require(:booking).permit(:price, :id)
    end

    def order_params
        params.require(:order).permit(:user_id, :total, :vendor_id)
    end
end