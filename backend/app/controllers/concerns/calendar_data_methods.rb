module CalendarDataMethods
    def fetch_calendar_data(vendor, start_day, end_day)
      calendar = vendor&.vendor_calendar
      return { error: 'No calendar connected.' } unless vendor.vendor_calendar
  
      refresh_token_if_needed(vendor.vendor_calendar)
      
      access_token = vendor.vendor_calendar.access_token
      client = Google::Apis::CalendarV3::CalendarService.new
      client.authorization = access_token

      fetch_events(client, start_day, end_day)
    end
  
    private
  
    def refresh_token_if_needed(calendar)
      refresh_access_token(calendar) if calendar.expires_at <= Time.now + 5.minutes
    end
  
    def fetch_events(client, start_day, end_day)
      calendar_id = 'primary'
      response = client.list_events(calendar_id,
                                    single_events: true,
                                    order_by: 'startTime',
                                    time_min: start_day,
                                    time_max: end_day)
  
      format_events(response.items)
    end
  
    def format_events(events)
      events.map do |event|
        {
          id: event.id,
            summary: event.summary,
            start_time: event.start.date_time,
            end_time: event.end.date_time,
            location: event.location
        }
      end
    end
  end
  