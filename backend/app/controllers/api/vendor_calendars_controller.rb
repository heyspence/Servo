class Api::VendorCalendarsController < ApplicationController
    include AuthenticationMethods
    include CalendarDataMethods
    # before_action :require_logged_in

    def index
        @vendor = Vendor.find(params[:vendor_id])
        events = fetch_calendar_data(@vendor)

        render json: events
    end

    def destroy
        @calendar = VendorCalendar.find_by(id: params[:id])

        unless @calendar
            render(json: { errors: 'Calendar does not exist' }, status: 422) and return
        end
    
        # unless @calendar.vendor.id == current_user.vendor_id
        #     render(json: {errors: 'Unauthorized user'}, status: 401) and return
        # end
    
        if @calendar.destroy
            render json: 'Success'
        else
            render json: { errors: 'Failed to delete the calendar' }, status: 422
        end
    end
end
