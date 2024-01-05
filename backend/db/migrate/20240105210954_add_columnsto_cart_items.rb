class AddColumnstoCartItems < ActiveRecord::Migration[7.0]
  def change
    add_column :cart_items, :options, :json, default: '{}'
    add_column :cart_items, :price, :float, null: false
    add_reference :cart_items, :address, foreign_key: true, null: false
  end
end
