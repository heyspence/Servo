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

    # Send reminder 5 days and 1 day before service 

    def upcoming_reminder(booking) 
        @booking = booking 
        @user = User.find(booking.user_id)
        @vendor = Vendor.find(booking.vendor_id)
        @address = @user.addresses[0]

        reminder_date = @booking.appointment_at - 5.days

        mail(to: @user.email, subject: "Upcoming Service Reminder for #{@user.first_name} with #{@vendor.name}", 
            body: "Your service with #{@vendor.name} is scheduled for #{booking.appointment_at}.",
            delivery_time: reminder_date)
    end

    # Service reminders throughout the year for services they have bought in the past (user selected frequency)

    def user_selected_reminder
    end 



end
