# == Schema Information
#
# Table name: oauth_tokens
#
#  id            :bigint           not null, primary key
#  user_id       :bigint           not null
#  access_token  :text
#  refresh_token :text
#  expires_at    :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class OauthToken < ApplicationRecord
    # encrypts :access_token, :refresh_token
    belongs_to :user
end
