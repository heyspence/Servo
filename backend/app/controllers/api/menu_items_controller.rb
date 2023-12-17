class Api::MenuItemsController < ApplicationController

    def index
        @restaurant = Restaurant.find(params[:restaurant_id])
        @menu_items = @restaurant.menu_items
        render :index
    end

    def show
        @menu_item = MenuItem.find(params[:id])
        render :show
    end
end
