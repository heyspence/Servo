class ReviewUniquness < ActiveRecord::Migration[7.0]
  def change
    add_index :reviews, [:user_id, :restaurant_id], unique: true
  end
end
