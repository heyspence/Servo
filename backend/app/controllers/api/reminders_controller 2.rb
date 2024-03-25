class Api::RemindersController < ApplicationController
    wrap_parameters include: Reminder.attribute_names + ['userId', 'vendorId']

    def create
        @reminder = Reminder.new(reminder_params)
        calculate_next_reminder_date(@reminder)

        if @reminder.save
            # Enqueue the SendReminderJob to be executed asynchronously
            SendReminderWorker.perform_async(@reminder.id)
            render json: { success: "Reminder created successfully" }
        else
            render json: { errors: @reminder.errors.full_messages }, status: :unprocessable_entity
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
        params.require(:reminder).permit(:id, :user_id, :vendor_id, :frequency, :last_sent_date, :next_reminder_date)
    end 

    
    def calculate_next_reminder_date(reminder)
        frequency_in_months = reminder.frequency.to_i
        next_reminder_date = Date.today.advance(months: frequency_in_months)
        reminder.next_reminder_date = next_reminder_date
    end
end
