# == Schema Information
#
# Table name: vendors
#
#  id                     :bigint           not null, primary key
#  name                   :string           not null
#  thumbnail_image_url    :string           not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  logo_image_url         :string
#  category               :string           not null
#  email                  :string           not null
#  phone_number           :string           not null
#  min_price              :decimal(, )      not null
#  price_to_duration_rate :decimal(, )      not null
#  pricing_formula        :string           not null
#
class Vendor < ApplicationRecord
    has_many_attached :photo
    has_many :reviews
    has_one :address, as: :addressable
    has_many :images
    has_many :bookings
    has_one :vendor_calendar, dependent: :destroy
    has_many :vendor_pricing_inputs
    has_many :pricing_inputs, through: :vendor_pricing_inputs
end
