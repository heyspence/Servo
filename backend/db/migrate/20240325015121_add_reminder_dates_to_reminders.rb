class AddReminderDatesToReminders < ActiveRecord::Migration[7.0]
  def change
    add_column :reminders, :last_sent_date, :date
    add_column :reminders, :next_reminder_date, :date
  end
end
