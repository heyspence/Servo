class Api::CartItemsController < ApplicationController

    def create
        @cart_item = CartItem.new(cart_item_params)
        if @cart_item.save
            render :show
        else
            render json: { errors: ["Unable to add to cart"] }
        end
    end

    def destroy
        @cart_item = CartItem.find(params[:id])
        if @cart_item && @cart_item.destroy
            render json: { message: "Success" }
        else
            render json: { errors: ["Cart item no longer exists"]}
        end
    end

    def destroy_all
        @user = User.find(params[:user_id])
        if @user.cart_items.destroy_all
            render json: { message: "Success" }
        end
    end

    def index
        @user = User.find(params[:user_id])
        @cart_items = @user.cart_items
        render :index
    end

    def show
        @cart_item = CartItem.find(params[:id])
        if @cart_item
            render :show
        else
            render json: { errors: ["Unable to find item"]}
        end
    end

    def cart_item_params
        params.require(:cart_item).permit(:user_id, :address_id, :price, :options, :service_id)
    end
end
