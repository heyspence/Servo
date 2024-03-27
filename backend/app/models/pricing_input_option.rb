# == Schema Information
#
# Table name: pricing_input_options
#
#  id               :bigint           not null, primary key
#  option_type      :string           not null
#  name             :string
#  value            :float            not null
#  pricing_input_id :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  default          :boolean          default(FALSE), not null
#
class PricingInputOption < ApplicationRecord
    validates :option_type, inclusion: {in: ["min", "max", "step", "select", "radio", "checkbox", "default", "tooltip"]}
    belongs_to :pricing_input
end
