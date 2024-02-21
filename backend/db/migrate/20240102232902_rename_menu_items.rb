class RenameMenuItems < ActiveRecord::Migration[7.0]
  def change
    rename_table :menu_items, :services

    rename_column :cart_items, :menu_item_id, :service_id
    rename_column :order_details, :menu_item_id, :service_id
  end
end
