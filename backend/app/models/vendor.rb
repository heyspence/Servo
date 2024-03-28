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
#  min_price              :float            not null
#  price_to_duration_rate :float            not null
#  pricing_formula        :string           not null
#
class Vendor < ApplicationRecord
    # TODO: Add validations to ensure an address gets created as part of creating a new vendor
    before_save :ensure_vendor_calendar
    has_many :reviews
    has_one :address, as: :addressable, dependent: :destroy
    has_many :images
    has_many :bookings
    has_one :vendor_calendar, dependent: :destroy
    has_many :vendor_pricing_inputs
    has_many :pricing_inputs, through: :vendor_pricing_inputs

    def ensure_vendor_calendar
        if self.vendor_calendar.nil?
            self.build_vendor_calendar
        end
    end

    has_many_attached :photo
end
