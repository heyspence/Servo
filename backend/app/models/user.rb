# == Schema Information
#
# Table name: users
#
#  id                 :bigint           not null, primary key
#  first_name         :string           not null
#  last_name          :string           not null
#  phone_number       :string
#  email              :string           not null
#  country            :string
#  password_digest    :string           not null
#  session_token      :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  user_type          :string           default("user")
#  vendor_id          :bigint
#  stripe_customer_id :string
#
class User < ApplicationRecord
    before_validation :ensure_session_token
    has_one :vendor, dependent: :destroy
    # before_save :self.email = email.downcase

    validates :first_name,
        presence: true,
        length: { in: 3..30 },
        format: { with: /\A[a-zA-Z]+\z/,
        message: "Name can only contain letters" }
    validates :last_name,
        presence: true,
        length: { in: 3..30 },
        format: { with: /\A[a-zA-Z]+\z/,
        message: "Name can only contain letters" }
    validates :phone_number,
        length: { is: 10 },
        format: { with: /\A\+?[1-9]\d{1,14}\z/ },
        allow_nil: true
    validates :email,
        uniqueness: true, 
        length: { in: 3..255 }, 
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password,
        presence: true,
        allow_nil: true,
        length: { in: 8..200 }
    validates :password_digest, 
        presence: true
    validates :session_token,
        presence: true,
        uniqueness: true

    has_secure_password

    has_many :bookings
    has_many :addresses, as: :addressable
    has_many :user_inputs, dependent: :destroy
    accepts_nested_attributes_for :addresses

    def self.find_by_credentials(email, password)
        user = User.find_by_email(email)
        user&.authenticate(password)
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end

    def generate_unique_session_token
        loop do
            token = SecureRandom.base64
            break token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end
end
