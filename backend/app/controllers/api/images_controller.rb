class Api::ImagesController < ApplicationController
    def index
        @vendor = Vendor.find(params[:vendor_id])
        @images = @vendor.images
        render :index
    end
end
