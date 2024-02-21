class Api::PaymentsController < ApplicationController
    def create
        cart_item = params[:cart_item]
        total_amount = calculate_total_amount(cart_item)
        total_amount_in_cents = (total_amount * 100).to_i
        
        begin
            intent = Stripe::PaymentIntent.create({
                amount: total_amount_in_cents,
                currency: 'usd'
            })

            render json: { client_secret: intent.client_secret }
        rescue Stripe::StripeError => e 
            render json: { error: e.message }, status: 404
        end
    end

    private
    def calculate_total_amount(cart_item)
        cart_item.price
    end
end
