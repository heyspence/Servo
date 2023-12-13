class AddLoginColumnsToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :password_digest, :string
    add_column :users, :session_token, :string
    add_index :users, :password_digest
    add_index :users, :session_token
  end
end
