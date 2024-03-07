class AddVendorCalendarColumns < ActiveRecord::Migration[7.0]
  def change
    add_column :vendor_calendars, :booking_window_start_days, :integer, default: 1, null: false
    add_column :vendor_calendars, :booking_window_end_days, :integer, default: 180, null: false
    add_column :vendor_calendars, :workday_start_time, :time, default: '09:00:00 +00:00', null: false
    add_column :vendor_calendars, :workday_end_time, :time, default: '19:00:00 +00:00', null: false
    add_column :vendor_calendars, :drive_time_buffer_mins, :integer, default: 15, null: false
    add_column :vendor_calendars, :api_integrated, :boolean, default: false, null: false
  end
end
