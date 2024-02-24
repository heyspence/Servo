# == Schema Information
#
# Table name: vendor_pricing_inputs
#
#  id               :bigint           not null, primary key
#  pricing_input_id :bigint           not null
#  vendor_id        :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class VendorPricingInput < ApplicationRecord
    belongs_to :vendor
    belongs_to :pricing_input
end
  
