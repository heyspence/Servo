class UserMailerPreview < ActionMailer::Preview
    def welcome_email
      user = User.last
      UserMailer.welcome_email(user)
    end

    def upcoming_reminder 
    end 
end