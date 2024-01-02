# == Schema Information
#
# Table name: orders
#
#  id               :bigint           not null, primary key
#  user_id          :bigint           not null
#  total            :float            not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  order_details_id :bigint
#  vendor_id        :bigint           not null
#
class Order < ApplicationRecord
    belongs_to :user
    belongs_to :restaurant
    has_many :order_details
end
