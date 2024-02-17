# == Schema Information
#
# Table name: vendor_calendars
#
#  id            :bigint           not null, primary key
#  vendor_id     :bigint           not null
#  access_token  :text
#  refresh_token :text
#  expires_at    :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class VendorCalendar < ApplicationRecord
    belongs_to :vendor
end
