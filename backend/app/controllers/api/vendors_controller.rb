class Api::VendorsController < ApplicationController
    def index
        @vendors = Vendor.all
        render :index 
    end

    def show
        @vendor = Vendor.find(params[:id])
        @address = @vendor.address
        @calendar = @vendor.vendor_calendar
        render :show
    end
end
