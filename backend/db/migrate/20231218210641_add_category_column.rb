class AddCategoryColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :restaurants, :category, :string, null:false
    add_column :restaurants, :email, :string, null: false
    add_column :restaurants, :phone_number, :string, null: false
  end
end
