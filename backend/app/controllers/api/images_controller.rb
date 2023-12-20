class Api::ImagesController < ApplicationController
    def index
        @restaurant = Restaurant.find(params[:restaurant_id])
        @images = @restaurant.images
        render :index
    end
end
