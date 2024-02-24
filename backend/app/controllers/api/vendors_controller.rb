class Api::VendorsController < ApplicationController
    # require CalendarDataMethods
    before_action :require_vendor_logged_in, only: [:update]
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
        bookings = current_user.bookings
        @booking = bookings.find_by_vendor_id(params[:id])
        render :show
    end

    def update
        @vendor = Vendor.find(params[:id])
        if @vendor.update(vendor_params) && @vendor.address.update(address_params)
            @address = @vendor.address
            @calendar = @vendor.vendor_calendar
            @images = @vendor.images
            @reviews = @vendor.reviews
            render :show
        else
            render @vendor.errors.full_messages
        end
    end

    private
    def vendor_params
        params.require(:vendor).permit(:name, :phone_number, :id)
    end

    def address_params
        params.require(:vendor).permit(:address)
    end
end
