class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            UserMailer.welcome_email(@user).deliver_later
            AdminMailer.new_user(@user).deliver_later
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @user = User.find(params[:id])
        if @user
            render :show
        else
            render json: { errors: "User no longer exists"}
        end
    end

    # Note: update method created but not tested
    # def update
    #     @user = User.find(params[:id])
    #     if @user
    #         if @user.update(user_params)
    #             render :show
    #         else
    #             render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    #         end
    #     else
    #         render json: { errors: "User not found" }, status: :not_found
    #     end
    # end

    private
    def user_params
        params.require(:user).permit(:email, :first_name, :last_name, :phone_number, :country, :password)
    end
end