# == Schema Information
#
# Table name: reviews
#
#  id            :bigint           not null, primary key
#  score         :float            not null
#  restaurant_id :bigint           not null
#  user_id       :bigint           not null
#  body          :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Review < ApplicationRecord
    validates :score, inclusion: { in: 0..5, message: "Score must be between 0 and 5" }
    validates :user_id, uniqueness: { scope: :restaurant_id, message: "Can only leave one review per customer"}
    belongs_to :user
    belongs_to :restaurant
end
