class CreateInputs < ActiveRecord::Migration[7.0]
  def change
    create_table :inputs do |t|
      t.string :input_type, null: false
      t.string :name, null: false
      t.references :vendor, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
