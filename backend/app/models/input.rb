# == Schema Information
#
# Table name: inputs
#
#  id         :bigint           not null, primary key
#  input_type :string           not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  required   :boolean          default(FALSE)
#  recurring  :boolean          default(FALSE)
#  order      :integer
#  alias      :string
#
class Input < ApplicationRecord
    validates :input_type, inclusion: { in: ["radio", "select", "range", "checkbox"], message: "Invalid input type"}
    has_many :service_inputs
    has_many :services, through: :service_inputs
    has_many :options, dependent: :destroy
end
