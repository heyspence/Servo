class RemindersController < ApplicationController

    def create 
        @reminder = Reminder.new(reminder_params)
        if @reminder.save
            reminder_dates = calculate_reminder_dates(@reminder)

            reminder_dates.each do |date|
                UserMailer.user_selected_reminder(@reminder).deliver_later(wait_until: date)
            end 
        else 
            render json: { errors: @reminder.errors.full_messages }
        end
    end 

    def update
        @reminder = Reminder.find(params[:id])
        if @reminder.update(booking_params)
            render :show
        else
            render json: { errors: @reminder.errors.full_messages }
        end
    end 

    def destroy 
        @reminder = Reminder.find_by(id: params[:id])
        @reminder.destroy
    end 

    private 
    def reminder_params 
        params.require(:reminder).permit(:id, :user_id, :vendor_id, :frequency)
    end 

    def calculate_reminder_dates(reminder)
        frequency = reminder.frequency 
        interval = 12 / frequency # Calculate interval between reminders in months
        reminder_dates = []
    
        current_date = Date.today
        frequency.times do
            reminder_dates << current_date
            current_date = current_date.advance(months: interval)
        end
    
        reminder_dates
    end
end
