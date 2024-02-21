class AddUserTypeAndReferencesVendorColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :user_type, :string, default: 'user'
    add_reference :users, :vendor, foreign_key: true
  end
end
