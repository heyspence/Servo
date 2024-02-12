class RenameRestaurants < ActiveRecord::Migration[7.0]
  def change
    rename_table :restaurants, :vendors

    rename_column :addresses, :restaurant_id, :vendor_id
    rename_column :images, :restaurant_id, :vendor_id
    rename_column :menu_items, :restaurant_id, :vendor_id
    rename_column :orders, :restaurant_id, :vendor_id
    rename_column :reviews, :restaurant_id, :vendor_id
  end
end
