class Api::EventsController < ApplicationController
    def index
        calendar_service = GoogleCalendarService.new
        @events = calendar_service.list_events('servo-102@servovendor.iam.gserviceaccount.com')
        render json: @events
    end

    def create
        calendar_service = GoogleCalendarService.new
        today = Date.today

        event = Google::Apis::CalendarV3::Event.new({
        start: Google::Apis::CalendarV3::EventDateTime.new(date: today),
        end: Google::Apis::CalendarV3::EventDateTime.new(date: today + 1),
        summary: 'New event!'
        })

        calendar_service.insert_event('servo-102@servovendor.iam.gserviceaccount.com', event)
        render json: @event
    end
end
