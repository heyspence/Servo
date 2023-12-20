class CreateImages < ActiveRecord::Migration[7.0]
  def change
    create_table :images do |t|
      t.string :url, null: false
      t.string :alt, null: false
      t.string :type
      t.references :restaurants, null: false, foreign_key: true
      t.timestamps
    end
  end
end
