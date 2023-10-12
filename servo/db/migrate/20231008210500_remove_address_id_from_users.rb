class RemoveAddressIdFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :address_id, :integer
  end
end
