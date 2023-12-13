# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  phone_number    :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  password_digest :string
#  session_token   :string
#
class User < ApplicationRecord
    before_validation :ensure_session_token

    validates :password, length: { minimum: 6 }, allow_nil: true
    validates :first_name, :password_digest, :session_token, 
    :last_name, :email, :phone_number, presence: true
    validates :email, uniqueness: true

    attr_reader :password
    has_one :address

    def self.find_by_credentials(email, password)
        @user = User.find_by(email: email)
        if @user&.is_password?(password)
            @user
        else
            nil
        end
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(password_digest).is_password?(password)
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def generate_unique_session_token
        loop do
            session_token = SecureRandom.urlsafe_base64
            unless User.find_by(session_token: session_token)
                return session_token
            end
        end
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        save!
        self.session_token
    end
end
