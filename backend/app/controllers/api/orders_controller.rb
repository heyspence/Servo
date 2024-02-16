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
        total_amount = cart_item_params[:price]
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
    def calculate_total_amount(cart_item)
        cart_item.price + 1.85
    end

    def cart_item_params
        params.require(:cart_item).permit(:price)
    end

    def order_params
        params.require(:order).permit(:user_id, :total, :vendor_id)
    end

    def order_detail_params
        params.require(:order_details).permit(:service_id, :price)
    end
end
