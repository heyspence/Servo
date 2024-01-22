class Api::AuthenticationController < ApplicationController
    require 'net/http'
    require 'uri'
    require 'byebug'

    protect_from_forgery except: :google_callback
    before_action :authenticate_user, only: [:google_callback]

    def google_callback
        # Step 1: Extract the Authorization Code
        authorization_code = params[:code]
        # Step 2: Exchange the Authorization Code for Tokens
        uri = URI.parse("https://oauth2.googleapis.com/token")
        request = Net::HTTP::Post.new(uri)
        request.set_form_data({
        "code" => authorization_code,
        "client_id" => ENV['GOOGLE_CLIENT_ID'],
        "client_secret" => ENV['GOOGLE_CLIENT_SECRET'],
        # "redirect_uri" => ENV['GOOGLE_REDIRECT_URI'],
        :redirect_uri => 'postmessage',
        "grant_type" => "authorization_code",
        })

        response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
        http.request(request)
        end

        # Parse the response
        tokens = JSON.parse(response.body)

        if response.is_a?(Net::HTTPSuccess)
            save_tokens_for_user(@current_user, tokens)
            render json: response
        else
        # Log the error for debugging
        Rails.logger.error("Google OAuth error: #{response.body}")

        # Inform the frontend of the failure
        render json: { error: "Failed to authenticate with Google." }, status: :unauthorized
        end
    end


    private

    def save_tokens_for_user(user, tokens)
        user.oauth_token.destroy if user.oauth_token
        user.create_oauth_token(
          access_token: tokens["access_token"],
          refresh_token: tokens["refresh_token"],
          expires_at: Time.now + tokens["expires_in"].to_i.seconds,
        )
    end

    def authenticate_user
        session_token = session[:user_token]
        @current_user = User.find_by_session_token(session[:session_token])

        unless @current_user
            render json: { error: "User not authenticated." }, status: :unauthorized
            return
        end
    end
end
