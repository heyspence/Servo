require 'google/apis/calendar_v3'
require 'googleauth'

class GoogleCalendarService
  def initialize
    scope = Google::Apis::CalendarV3::AUTH_CALENDAR
    authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
      json_key_io: File.open('./servovendor-5f192805a8c8.json'),
      scope: scope
    )
    @calendar_service = Google::Apis::CalendarV3::CalendarService.new
    @calendar_service.authorization = authorizer
  end

  def list_events(calendar_id)
    @calendar_service.list_events(calendar_id)
  end
end