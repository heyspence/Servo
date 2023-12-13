class AddUserIdToAddresses < ActiveRecord::Migration[7.0]
  def change
    add_column :addresses, :user_id, :integer
    add_index :addresses, :user_id
    add_foreign_key :addresses, :users, column: :user_id
  end
end
