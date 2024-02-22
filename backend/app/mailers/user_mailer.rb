class UserMailer < ApplicationMailer
    def welcome_email(user)
        @user = user
        @url = "https://www.bookservo.com/"
        mail(to: @user.email, subject: 'Welcome to Servo')
    end

    def order_confirmation(order)
        @order = order
        @user = User.find(order.user_id)
        @vendor = Vendor.find(order.vendor_id)
        @address = @user.addresses[0]
        mail(to: @user.email, subject: "Booking Confirmation for #{@user.first_name} with #{@vendor.name}")
    end
end
