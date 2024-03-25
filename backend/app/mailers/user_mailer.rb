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

        reminder_date = @booking.appointment_at - 5.days

        mail(to: @user.email, subject: "Upcoming Service Reminder for #{@user.first_name} with #{@vendor.name}", 
            body: "Your service with #{@vendor.name} is scheduled for #{booking.appointment_at}.")
    end

    # Service reminders throughout the year for services they have bought in the past (user selected frequency)

    def user_selected_reminder(reminder)
        @reminder = reminder 
        @user = User.find(reminder.user_id)
        @vendor = Vendor.find(reminder.vendor_id)

        mail(to: @user.email, subject: "Reminder to book service with #{@vendor.name}")

        # schedule_next_reminder(@user)
    end 


    ## Completed notification, ask for review 

    def order_completed 
        @booking = booking 
        @user = User.find(booking.user_id)
        @vendor = Vendor.find(booking.vendor_id)
        
        mail(to: @user.email, subject: "]#{@user.first_name}, Thank you for booking #{@vendor.name} with Servo." , 
            body: "Please Leave a Review")
    end 


    # private

    # def schedule_next_reminder(user)
    #     frequency_in_months = user.reminder_frequency.to_i
    #     next_reminder_time = Time.now + frequency_in_months.months
    #     ReminderMailer.user_selected_reminder(@reminder).deliver_later(wait_until: next_reminder_time)
    # end



end
