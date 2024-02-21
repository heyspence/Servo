class UserMailer < ApplicationMailer
    def welcome_email(user)
        @user = user
        @url = "https://www.bookservo.com/"
        mail(to: @user.email, subject: 'Welcome to Servo')
    end
end
