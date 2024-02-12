class CreateServiceInputs < ActiveRecord::Migration[7.0]
  def change
    create_table :service_inputs do |t|
      t.references :input, foreign_key: true
      t.references :service, foreign_key: true
      t.timestamps 
    end
    remove_column :inputs, :service_id, :bigint
  end
end
