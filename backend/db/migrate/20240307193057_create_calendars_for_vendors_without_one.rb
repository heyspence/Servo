class CreateCalendarsForVendorsWithoutOne < ActiveRecord::Migration[7.0]
  def up 
    Vendor.find_each do |vendor|
      calendar = vendor.vendor_calendar
      unless calendar 
        VendorCalendar.create!({vendor_id: vendor.id})
      end

      if calendar[:access_token].present?
        calendar.update!(api_integrated: true)
      end
    end
  end
end
