class RemoveRandomColumnInUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, 12, :string
    change_column_null :users, :address_id, false
  end
end
