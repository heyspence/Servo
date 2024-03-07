class AddDurationToBookings < ActiveRecord::Migration[7.0]
  def change
    add_column :bookings, :duration, :integer, null: false, default: 90
  end
end
