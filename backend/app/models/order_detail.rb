# == Schema Information
#
# Table name: order_details
#
#  id           :bigint           not null, primary key
#  order_id     :bigint           not null
#  menu_item_id :bigint           not null
#  price        :float            not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class OrderDetail < ApplicationRecord
    belongs_to :order 
    belongs_to :menu_item
end
