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
#  category       :string           not null
#  email          :string           not null
#  phone_number   :string           not null
#
class Restaurant < ApplicationRecord
    has_many :menu_items
    has_many_attached :photo
    has_many :reviews
    has_one :address
end
