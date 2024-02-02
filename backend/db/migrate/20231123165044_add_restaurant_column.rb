class AddRestaurantColumn < ActiveRecord::Migration[7.0]
  def change
    add_reference :orders, :restaurant, null: false
  end
end
