class AddOrderDetailsColumn < ActiveRecord::Migration[7.0]
  def change
    add_reference :orders, :order_details
  end
end
