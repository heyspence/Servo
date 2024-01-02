class Api::ReviewsController < ApplicationController
    def index
        @vendor = Vendor.find(params[:vendor_id])
        @reviews = @vendor.reviews
        render :index
    end

    def show
        @review = Review.find(params[:id])
        render :show
    end

    def create
        @vendor = Vendor.find(params[:vendor_id])
        @review = @vendor.reviews.new(review_params)
        if @review.save
            render :show
        else
            render json: { errors: "Unable to create review" }, status: :unprocessable_entity
        end
    end

    def destroy 
        @review = Review.find(params[:id])
        if @review && @review.destroy
            render json: { message: "Sucecss" }
        else
            render json: { errors: "Review not found"}, status: :unprocessable_entity
        end
    end

    def update
        @review = Review.find(params[:id])
        if @review.update(review_params)
            render json: { message: "Success"}
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private 
    def review_params
        params.require(:review).permit(:user_id, :restaurant_id, :score, :body)
    end
end
