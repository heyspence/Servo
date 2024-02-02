class CreateOrderDetails < ActiveRecord::Migration[7.0]
  def change
    create_table :order_details do |t|
      t.references :order, null: false, foreign_key: true, index: true
      t.references :menu_item, null: false, foreign_key: true
      t.float :price, null: false
      t.timestamps
    end
  end
end
