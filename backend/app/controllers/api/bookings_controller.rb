class Api::BookingsController < ApplicationController
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

    def create_order
        @booking = Booking.find(params[:id])
        # @user = User.find(@booking.user_id)
        if @booking.status == 'pending' && params[:booking][:status] == 'paid'
            if @booking.update(booking_params)
                VendorMailer.work_order(@booking).deliver_now
                UserMailer.order_confirmation(@booking).deliver_now
                AdminMailer.new_order(@booking).deliver_now
                render :show
            else
                render json: { errors: @booking.errors.full_messages }
            end
        else
            render json: {errors: 'Order not found or unprocessable'}, status: 422
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

    def destroy_all
        @user = User.find(params[:user_id])
        if @user.bookings.destroy_all
            render json: { message: "Success" }
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
        params.require(:booking).permit(:id, :user_id, :address_id, :price, :vendor_id, :status, :appointment_at, :options_snapshot)
    end
end
