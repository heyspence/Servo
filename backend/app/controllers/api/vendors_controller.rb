class Api::VendorsController < ApplicationController
    # require CalendarDataMethods
    require 'byebug'

    def index
        @vendors = Vendor.all
        render :index 
    end

    def show
        @vendor = Vendor.find(params[:id])
        @address = @vendor.address
        @calendar = @vendor.vendor_calendar
        @images = @vendor.images
        @reviews = @vendor.reviews
        @services = @vendor.services
        @cart_item = @vendor.cart_items[0]
        render :show
    end
end
