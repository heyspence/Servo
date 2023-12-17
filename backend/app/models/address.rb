# == Schema Information
#
# Table name: addresses
#
#  id        :bigint           not null, primary key
#  latitude  :float
#  longitude :float
#  address   :string
#
class Address < ApplicationRecord
    belongs_to :restaurant
end
