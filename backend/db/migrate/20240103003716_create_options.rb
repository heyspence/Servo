class CreateOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :options do |t|
      t.string :option_type, null: false
      t.string :name
      t.float :value, null:false
      t.references :input, null: false, foreign_key: true
      t.timestamps
    end
  end
end
