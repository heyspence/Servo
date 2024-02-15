require 'stripe'

class Api::OrdersController < ApplicationController
    def index
        @user = User.find(params[:user_id])
        @orders = @user.orders.order(created_at: :desc).limit(10)
        render :index
    end

    def create
        @order = Order.new(order_params)
        if @order.save
            render :show 
        end
    end

    def create_payment_intent
        # cart_item = params[:cart_item]
        # total_amount = calculate_total_amount(cart_item)
        # total_amount_in_cents = (total_amount * 100).to_i
        
        begin
            intent = Stripe::PaymentIntent.create({
                amount: 1000,
                currency: 'usd',
                payment_method_types: ['card'],
            })

            render json: { clientSecret: intent.client_secret }
        rescue Stripe::StripeError => e 
            render json: { error: e.message }, status: 422
        end
    end

    private 
    # def calculate_total_amount(cart_item)
    #     cart_item.price
    # end

    def order_params
        params.require(:order).permit(:user_id, :total, :vendor_id)
    end

    def order_detail_params
        params.require(:order_details).permit(:service_id, :price)
    end
end
