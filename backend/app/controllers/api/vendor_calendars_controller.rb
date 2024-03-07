class Api::VendorCalendarsController < ApplicationController
    include AuthenticationMethods
    include CalendarDataMethods
    before_action :require_logged_in
    before_action :validate_vendor_permissions, only: [:destroy]

    def index
        vendor = Vendor.find(params[:vendor_id])
        calendar = vendor.vendor_calendar
        buffer_time = calendar.drive_time_buffer_mins
        params[:booking] ||= {}
        duration = (params[:booking][:duration] ||= 90)
        today = DateTime.now
        start_day = today + calendar.booking_window_start_days.days
        end_day = today + calendar.booking_window_end_days.days
        start_hour = calendar.workday_start_time
        end_hour = calendar.workday_end_time
        events = []

        if vendor.vendor_calendar # Remove this later. All vendors must have a calendar even if it isnt google calendar integrated
            events = fetch_calendar_data(vendor, start_day, end_day)
            available_times = get_available_times(events, calendar.booking_window_end_days, start_day, start_hour, end_hour, buffer_time, duration)
        end

        # example_time = [{1 => {start_time: '2024:12:29'}}]
        formatted_available_times = []
        available_times.each_with_index do |time, i|
            i = {start_time: time}
            formatted_available_times << i
        end

        render json: formatted_available_times
    end

    def destroy
        @calendar = VendorCalendar.find_by(id: params[:id])

        # Check that calendar exists
        unless @calendar
            render(json: { errors: 'Calendar does not exist' }, status: 422) and return
        end
    
        # Check that the user is authorized
        unless @calendar.vendor.id == current_user.vendor_id
            render(json: {errors: 'Unauthorized user'}, status: 401) and return
        end
    
        if @calendar.update!(api_integrated: false, access_token: nil, refresh_token: nil)
            render json: 'Success'
        else
            render json: { errors: 'Failed to delete the calendar' }, status: 422
        end
    end

    private
    def generate_days(start_date, num_days)
        (0...num_days).map do |num|
            start_date + num.days
        end
    end

    def get_available_times(events, num_days, start_day, start_hour, end_hour, buffer_time, duration)
        all_days = generate_days(start_day, num_days)

        gaps = []

        formatted_events = events.group_by do |event|
            event[:start_time].to_date
        end 

        all_days.each do |day|
            day_events = formatted_events[day.to_date] || []

            if day_events.empty? || (day_events.first[:start_time].hour - start_hour.getutc.hour) < (duration / 1440)
                gaps << Time.new(day.year, day.month, day.day, start_hour.getutc.hour, 0, 0)
            end

            day_events.each_cons(2) do |prev_event, next_event|
                if (next_event[:start_time] - prev_event[:end_time]) > (duration / 1440)
                    gaps << prev_event[:end_time] + buffer_time.minutes
                end
            end
        
                # Check for gap between last event and closing time
            unless day_events.empty?
                last_event_end = day_events.last[:end_time]
                if (end_hour.getutc.hour - last_event_end.hour) > (duration / 1440)
                gaps << last_event_end.strftime("%Y-%m-%d %H:%M:%S")
                end
            end
        end

        gaps
    end
end
