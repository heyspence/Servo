class CreateVendorCalendars < ActiveRecord::Migration[7.0]
  def change
    create_table :vendor_calendars do |t|
      t.references :vendor, null: false, foreign_key: true
      t.text :access_token
      t.text :refresh_token
      t.datetime :expires_at
      
      t.timestamps
    end
  end
end
