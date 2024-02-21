class AdminMailer < ApplicationMailer
    default to: 'spencer@bookservo.com'
    def new_user(user)
        @user = user
        mail(subject: "New Account: #{@user.email}")
    end

    def new_user_login(user)
        @user = user
        mail(subject: "New User Login: #{@user.email}")
    end

    def contact_us_email(message)
        @message = message[:message]
        @name = message[:name]
        @email = message[:email]
        mail(subject: "IMPORTANT: New Message from #{@name}")
    end
end
