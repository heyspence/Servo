# == Schema Information
#
# Table name: service_inputs
#
#  id         :bigint           not null, primary key
#  input_id   :bigint
#  service_id :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ServiceInput < ApplicationRecord
    belongs_to :service
    belongs_to :input
  end
  
