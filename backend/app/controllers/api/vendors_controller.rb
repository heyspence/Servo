class Api::VendorsController < ApplicationController
    def index
        @vendors = Vendor.all
        return :index 
    end

    def show
        @vendor = Vendor.find(params[:id])
        @address = @vendor.address
        render :show
    end
end
