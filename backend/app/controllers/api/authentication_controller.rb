class Api::AuthenticationController < ApplicationController
    require 'net/http'
    require 'uri'
    require 'byebug'

    protect_from_forgery except: :google_callback
    before_action :validate_vendor_permissions, only: [:google_callback]

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
            :redirect_uri => 'postmessage',
            "grant_type" => "authorization_code",
        })

        response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
            http.request(request)
        end

        # Parse the response
        tokens = JSON.parse(response.body)

        if response.is_a?(Net::HTTPSuccess)
            vendor = Vendor.find(@current_user.vendor_id)
            save_tokens_for_vendor(vendor, tokens)
            render json: { status: "Success", calendarId: vendor.vendor_calendar.id}
        else
            # Log the error for debugging
            Rails.logger.error("Google OAuth error: #{response.body}")

            # Inform the frontend of the failure
            render json: { error: "Failed to authenticate with Google." }, status: :unauthorized
        end
    end

    private

    def save_tokens_for_vendor(vendor, tokens)
        vendor.vendor_calendar.destroy if vendor.vendor_calendar
        vendor.create_vendor_calendar(
          access_token: tokens["access_token"],
          refresh_token: tokens["refresh_token"],
          expires_at: Time.now + tokens["expires_in"].to_i.seconds,
          api_integrated: true
        )
    end
end
