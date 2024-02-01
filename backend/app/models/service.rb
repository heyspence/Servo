# == Schema Information
#
# Table name: services
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  price      :float            not null
#  vendor_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  image_url  :string
#  formula    :string
#
class Service < ApplicationRecord
    belongs_to :vendor
    has_many :service_inputs
    has_many :inputs, through: :service_inputs
    has_one_attached :photo
end
