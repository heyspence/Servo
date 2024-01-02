# == Schema Information
#
# Table name: menu_items
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  price      :float            not null
#  vendor_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  image_url  :string
#
class MenuItem < ApplicationRecord
    belongs_to :vendor
    has_one_attached :photo
end
