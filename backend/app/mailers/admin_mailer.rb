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
end
