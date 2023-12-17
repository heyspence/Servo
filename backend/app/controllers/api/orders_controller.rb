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

    private 
    def order_params
        params.require(:order).permit(:user_id, :total, :restaurant_id)
    end

    def order_detail_params
        params.require(:order_details).permit(:menu_item_id, :price)
    end
end
