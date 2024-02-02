# == Schema Information
#
# Table name: images
#
#  id         :bigint           not null, primary key
#  url        :string           not null
#  alt        :string           not null
#  image_type :string
#  vendor_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Image < ApplicationRecord
    belongs_to :vendor
end
