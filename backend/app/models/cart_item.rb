# == Schema Information
#
# Table name: cart_items
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  service_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  options    :json
#  price      :float            not null
#  address_id :bigint           not null
#
class CartItem < ApplicationRecord
    belongs_to :user
    belongs_to :service
    belongs_to :address
end
