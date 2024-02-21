class CreateMenuItems < ActiveRecord::Migration[7.0]
  def change
    create_table :menu_items do |t|
      t.string :name, null: false
      t.float :price, null: false
      t.references :restaurant, null: false, foreign_key: true
      t.timestamps
    end
  end
end
