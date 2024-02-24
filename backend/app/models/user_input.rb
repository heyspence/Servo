# == Schema Information
#
# Table name: user_inputs
#
#  id               :bigint           not null, primary key
#  pricing_input_id :bigint           not null
#  address_id       :bigint           not null
#  user_id          :bigint           not null
#  input_option_id  :bigint
#  value_text       :string
#  value_numeric    :float
#  value_boolean    :boolean
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class UserInput < ApplicationRecord
    belongs_to :pricing_input
    belongs_to :address
    belongs_to :user
    belongs_to :input_option, optional: true
end
