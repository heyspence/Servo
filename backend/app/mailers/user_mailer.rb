class UserMailer < ApplicationMailer
    def welcome_email(user)
        return if user.email.ends_with?('dashdoor.com')
        @user = user
        @url = "https://www.bookservo.com/"
        mail(to: @user.email, subject: 'Welcome to Servo')
    end
end
