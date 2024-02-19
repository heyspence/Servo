# == Schema Information
#
# Table name: addresses
#
#  id               :bigint           not null, primary key
#  latitude         :float
#  longitude        :float
#  street_address   :string           not null
#  addressable_type :string           not null
#  addressable_id   :bigint           not null
#  default          :boolean          default(FALSE)
#  zip_code         :string           default("000000"), not null
#  city             :string           default("St George"), not null
#  state            :string           default("UT"), not null
#  street_address_2 :string
#
class Address < ApplicationRecord
    belongs_to :addressable, polymorphic: true
    has_many :cart_items
    validates :street_address, presence: true
    validates :zip_code, presence: true, format: { with: /\A\d{5}(-\d{4})?\z/, message: "must be a valid ZIP code" }
    validates :city, presence: true
    validates :state, presence: true, format: { with: /\A[A-Z]{2}\z/, message: "must be a valid 2-letter state code" }
    validates :street_address, length: { minimum: 5, maximum: 100 }
    validates :city, format: { with: /\A[a-zA-Z\s\-]+\z/, message: "must be a valid city name" }
end
