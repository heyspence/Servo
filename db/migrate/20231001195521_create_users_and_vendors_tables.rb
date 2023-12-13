class CreateUsersAndVendorsTables < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.string :address_1, null: false
      t.string :adderss_2
      t.string :city, null: false
      t.string :state, null: false
      t.integer :zip_code, null: false
    end

    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false, unique: true
      t.string :phone_number, 12, null: false
      t.integer :address_id
      t.timestamps
    end
    add_index :users, :address_id
    add_foreign_key :users, :addresses, column: :address_id
  end
end
