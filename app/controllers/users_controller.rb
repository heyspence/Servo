class UsersController < ApplicationController
    before_action :require_logged_in, only: [:index, :show, :destroy, :edit]

    def new
        @user = User.new
        render :new
    end

    def create
        @user = User.new(user_params)
        if @user&.save
            login(@user)
            flash[:messages] = ["Successfully Logged In"]
            redirect_to user_url(@user)
        else
            flash.now[:errors] = @user.errors.full_messages
            @user = User.new(user_params)
            render :new
        end
    end

    def show
        @user = User.find(params[:id])
        render :show
    end

    def index
        @users = User.all 
        render :index
    end

    def edit
        @user = User.find(params[:id])
        render :edit
    end

    def update
    end

    def destroy
        @user = User.find(params[:id])
        @user.destroy
        redirect_to new_session_url
    end
    
    private
    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :phone_number, :password)
    end
end
