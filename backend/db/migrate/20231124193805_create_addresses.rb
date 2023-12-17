class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.float :latitude
      t.float :longitude
      t.string :address
      t.references :restaurant
    end
  end
end
