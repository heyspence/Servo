class AddRequiredRecurringOrderAliasColumnsToInputs < ActiveRecord::Migration[7.0]
  def change
    add_column :inputs, :required, :boolean, :default => false
    add_column :inputs, :recurring, :boolean, :default => false
    add_column :inputs, :order, :integer
    add_column :inputs, :alias, :string
  end
end
