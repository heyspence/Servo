class Api::VendorCalendarsController < ApplicationController
    include AuthenticationMethods

    def index
        @vendor = Vendor.find(params[:vendor_id])
        calendar = @vendor.vendor_calendar

        unless @vendor.vendor_calendar
            render json: { error: 'No calendar connected.' }
            return
        end

        if calendar.expires_at <= Time.now + 5.minutes
            refresh_access_token(calendar)
        end

        access_token = @vendor.vendor_calendar.access_token

        client = Google::Apis::CalendarV3::CalendarService.new
        client.authorization = access_token

        # Specify the calendar ID ('primary' for the user's primary calendar) and query parameters
        calendar_id = 'primary'
        response = client.list_events(calendar_id,
            max_results: 10,
            single_events: true,
            order_by: 'startTime',
            time_min: Time.now.iso8601)

        # Format the events for your application's needs
        events = response.items.map do |event|
        {
            id: event.id,
            summary: event.summary,
            start_time: event.start.date_time,
            end_time: event.end.date_time
        }
        end

        render json: events
    end
end
