# == Schema Information
#
# Table name: restaurants
#
#  id             :bigint           not null, primary key
#  name           :string           not null
#  image_url      :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  icon_image_url :string
#  address_id     :bigint           not null
#
class Restaurant < ApplicationRecord
    has_many :menu_items
    has_many_attached :photo
    has_many :reviews
    has_one :address
end
