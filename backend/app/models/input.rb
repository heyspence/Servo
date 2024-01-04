# == Schema Information
#
# Table name: inputs
#
#  id         :bigint           not null, primary key
#  input_type :string           not null
#  name       :string           not null
#  service_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  required   :boolean          default(FALSE)
#  recurring  :boolean          default(FALSE)
#  order      :integer
#  alias      :string
#
class Input < ApplicationRecord
    validates :input_type, inclusion: { in: ["radio", "select", "range", "checkbox"], message: "Invalid input type"}
    belongs_to :service
    has_many :options
end
