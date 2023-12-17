class Api::RestaurantsController < ApplicationController
    def index
        @restaurants = Restaurant.all
        return :index 
    end

    def show
        @restaurant = Restaurant.find(params[:id])
        @address = @restaurant.address
        render :show
    end
end
