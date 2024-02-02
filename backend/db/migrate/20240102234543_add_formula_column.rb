class AddFormulaColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :services, :formula, :string
  end
end
