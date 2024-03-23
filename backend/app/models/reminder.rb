class Reminder < ApplicationRecord
    validates :frequency, presence: true 
    belongs_to :user 
    belongs_to :vendor 
end
