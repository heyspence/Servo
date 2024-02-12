class AddReferencesToAddresses < ActiveRecord::Migration[7.0]
  def change
    remove_reference :addresses, :vendor
    add_reference :addresses, :addressable, polymorphic: true, null: false
    add_column :addresses, :default, :boolean, default: false, required: true
  end
end
