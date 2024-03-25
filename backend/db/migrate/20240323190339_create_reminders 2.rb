class CreateReminders < ActiveRecord::Migration[7.0]
  def change
    create_table :reminders do |t|
      t.references :user, foreign_key: true, null: false 
      t.references :vendor, foreign_key: true, null: false 
      t.integer :frequency, null: false 

      t.timestamps
    end
  end
end
