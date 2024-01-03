# == Schema Information
#
# Table name: options
#
#  id          :bigint           not null, primary key
#  option_type :string           not null
#  name        :string
#  value       :float            not null
#  input_id    :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Option < ApplicationRecord
    validates :option_type, inclusion: {in: ["min", "max", "step", "select"]}
    belongs_to :input
end
