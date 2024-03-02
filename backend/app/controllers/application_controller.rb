class ApplicationController < ActionController::API
    include ActionController::RequestForgeryProtection
    # protect_from_forgery with: :exception
    rescue_from ActionController::InvalidAuthenticityToken, with: :handle_csrf_exception
    before_action :snake_case_params, :attach_authenticity_token

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end


    def handle_csrf_exception
        render json: {errors: ["Invalid Authenticity Token"]}, status: 422
    end

    def current_user
        @current_user ||= User.find_by_session_token(session[:session_token])
    end
    

    def logged_in?
        !!current_user
    end
    

    def login!(user)
        session[:session_token] = user.reset_session_token!
        AdminMailer.new_user_login(user).deliver_later
    end
    

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def require_logged_in
        unless current_user
            render json: { message: 'Unauthorized user'}, status: :unauthorized
        end
    end

    def require_vendor_logged_in
        unless current_user.vendor_id == params[:id].to_i()
            render json: { message: 'Unauthorized user'}, status: :unauthorized
        end
    end

    private
    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end
end
