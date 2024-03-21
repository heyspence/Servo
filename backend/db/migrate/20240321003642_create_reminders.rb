class CreateReminders < ActiveRecord::Migration[7.0]
  def change
    create_table :reminders do |t|

      t.timestamps
    end
  end
end
