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
end
