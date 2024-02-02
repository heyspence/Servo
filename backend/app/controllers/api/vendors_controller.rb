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
        cart_items = current_user.cart_items
        @cart_item = cart_items.find_by_vendor_id(params[:id])
        render :show
    end
end
