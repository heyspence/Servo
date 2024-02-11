class AdminMailer < ApplicationMailer
    def new_user(user)
        @user = user
        mail(to: 'spencer@bookservo.com', subject: 'New User Account Created')
    end
end
