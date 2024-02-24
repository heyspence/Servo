# == Schema Information
#
# Table name: pricing_inputs
#
#  id         :bigint           not null, primary key
#  input_type :string           not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  required   :boolean          default(FALSE), not null
#  recurring  :boolean          default(FALSE), not null
#  alias      :string           not null
#  category   :string           not null
#
class PricingInput < ApplicationRecord
    validates :input_type, inclusion: { in: ["radio", "select", "range"], message: "Invalid input type"}
    has_many :vendors, through: :service_inputs
    has_many :pricing_input_options, dependent: :destroy
end
