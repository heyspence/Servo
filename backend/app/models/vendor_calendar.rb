# == Schema Information
#
# Table name: vendor_calendars
#
#  id                        :bigint           not null, primary key
#  vendor_id                 :bigint           not null
#  access_token              :text
#  refresh_token             :text
#  expires_at                :datetime
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  booking_window_start_days :integer          default(1), not null
#  booking_window_end_days   :integer          default(180), not null
#  workday_start_time        :time             default(Sat, 01 Jan 2000 02:00:00.000000000 MST -07:00), not null
#  workday_end_time          :time             default(Sat, 01 Jan 2000 12:00:00.000000000 MST -07:00), not null
#  drive_time_buffer_mins    :integer          default(15), not null
#  api_integrated            :boolean          default(FALSE), not null
#
class VendorCalendar < ApplicationRecord
    belongs_to :vendor
    validates :booking_window_start_days, numericality: { less_than_or_equal_to: 21}
    validates :booking_window_end_days, numericality: { less_than_or_equal_to: 180 }
    validates :drive_time_buffer_mins, numericality: { less_than_or_equal_to: 60 }
end
