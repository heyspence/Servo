require 'sidekiq'

class SendReminderWorker
    include Sidekiq::Worker

    def perform(reminder_id)
        reminder = Reminder.find(reminder_id)
        next_reminder_time = reminder.next_reminder_date.to_time
    
        if Time.now >= next_reminder_time
            UserMailer.user_selected_reminder(reminder).deliver_now
            schedule_next_reminder(reminder)
        else
            SendReminderWorker.perform_at(next_reminder_time, reminder_id)
        end
    end

    private

    def schedule_next_reminder(reminder)
        frequency_in_months = reminder.frequency.to_i
        next_reminder_date = reminder.next_reminder_date.advance(months: frequency_in_months)

        reminder.update(last_sent_date: Date.today, next_reminder_date: next_reminder_date)
    end
end

