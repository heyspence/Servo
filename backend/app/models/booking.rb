# == Schema Information
#
# Table name: bookings
#
#  id               :bigint           not null, primary key
#  user_id          :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  options_snapshot :json
#  price            :decimal(, )      not null
#  address_id       :bigint           not null
#  vendor_id        :bigint           not null
#  status           :string           default("priced"), not null
#  appointment_at   :datetime
#
class Booking < ApplicationRecord
    validates :status, inclusion: {in: ["priced", "scheduled", "pending", "paid", "completed", "cancelled", "expired"]}
    belongs_to :user
    belongs_to :vendor
    belongs_to :address
end
