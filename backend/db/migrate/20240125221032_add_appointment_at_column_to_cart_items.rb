class AddAppointmentAtColumnToCartItems < ActiveRecord::Migration[7.0]
  def change
    add_column :cart_items, :appointment_at, :datetime
  end
end
