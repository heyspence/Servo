# == Schema Information
#
# Table name: addresses
#
#  id        :bigint           not null, primary key
#  address_1 :string           not null
#  adderss_2 :string
#  city      :string           not null
#  state     :string           not null
#  zip_code  :integer          not null
#  user_id   :integer
#
class Address < ApplicationRecord
    validates :address_1, :city, :state, :zip_code, presence: true
    validates :state, inclusion: 
        { in: %w(AL AK AZ AR CA CO CT DE FL GA 
            HI ID IL IN IA KS KY LA ME MD 
            MA MI MN MS MO MT NE NV NH NJ 
            NM NY NC ND OH OK OR PA RI SC 
            SD TN TX UT VT VA WA WV WI WY) }

    belongs_to :user
end
