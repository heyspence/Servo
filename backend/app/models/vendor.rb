# == Schema Information
#
# Table name: vendors
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
class Vendor < ApplicationRecord
    has_many :services
    has_many_attached :photo
    has_many :reviews
    has_one :address, as: :addressable
    has_many :images
    has_many :cart_items
end
