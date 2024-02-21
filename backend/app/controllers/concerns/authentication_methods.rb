module AuthenticationMethods
    extend ActiveSupport::Concern

    GOOGLE_REFRESH_URL = 'https://oauth2.googleapis.com/token'.freeze
  
    def refresh_access_token(vendor_calendar)
      uri = URI.parse(GOOGLE_REFRESH_URL)
      request = Net::HTTP::Post.new(uri)
      request.set_form_data({
        client_id: ENV['GOOGLE_CLIENT_ID'],
        client_secret: ENV['GOOGLE_CLIENT_SECRET'],
        refresh_token: vendor_calendar.refresh_token,
        grant_type: 'refresh_token',
      })

      response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
        http.request(request)
      end

      tokens = JSON.parse(response.body)

      if response.is_a?(Net::HTTPSuccess)
        vendor_calendar.update!(
          access_token: tokens['access_token'],
          # Optionally update the refresh token if a new one is sent back
          refresh_token: tokens['refresh_token'] || vendor_calendar.refresh_token,
          expires_at: Time.now + tokens['expires_in'].to_i.seconds,
        )
      else
        Rails.logger.error("Failed to refresh Google OAuth token: #{response.body}")
        # Handle the error, e.g., by notifying the user or retrying
      end
    end


  end