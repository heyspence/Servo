class AddStatusToCartItems < ActiveRecord::Migration[7.0]
  def change
    add_column :cart_items, :status, :string, default: :priced,null: false
  end
end
