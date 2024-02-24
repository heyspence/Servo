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

    private
    def calculate_total_amount(booking)
        booking.price
    end
end
