class Api::BookingsController < ApplicationController
    before_action :require_logged_in, only: [:create_order]

    require 'byebug'
    def create
        @booking = Booking.new(booking_params)
        if @booking.save
            render :show
        else
            render json: { errors: @booking.errors.full_messages }
        end
    end

    def update
        @booking = Booking.find(params[:id])
        if @booking.update(booking_params)
            render :show
        else
            render json: { errors: @booking.errors.full_messages }
        end
    end

    def destroy
        @booking = Booking.find(params[:id])
        if @booking && @booking.destroy
            render json: { message: "Success" }
        else
            render json: { errors: ["Booking no longer exists"]}
        end
    end

    def index
        @user = User.find(params[:user_id])
        @bookings = @user.bookings.where("status != ? AND status != ?", 'paid', 'completed')
        render :index
    end

    def show
        @booking = Booking.find(params[:id])
        if @booking && (@booking.status != "paid" || @booking.status != "completed")
            render :show
        else
            render json: { errors: ["Unable to find item"]}
        end
    end

    def booking_params
        params.require(:booking).permit(:id, :user_id, :address_id, :price, :vendor_id, :status, :appointment_at, :options_snapshot, :duration)
    end
end
