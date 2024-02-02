# == Schema Information
#
# Table name: addresses
#
#  id               :bigint           not null, primary key
#  latitude         :float
#  longitude        :float
#  address          :string
#  addressable_type :string           not null
#  addressable_id   :bigint           not null
#  default          :boolean          default(FALSE)
#
class Address < ApplicationRecord
    belongs_to :addressable, polymorphic: true
    has_many :cart_items
end
