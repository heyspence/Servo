class AddZipCodeAndCityToAddresses < ActiveRecord::Migration[7.0]
  def change
    add_column :addresses, :zip_code, :bigint, null: false, default: 0
    add_column :addresses, :city, :string, null: false, default: "St George"
    add_column :addresses, :state, :string, null: false, default: 'UT'
    add_column :addresses, :street_address_2, :string
    rename_column :addresses, :address, :street_address
    change_column_null :addresses, :street_address, false
  end
end
