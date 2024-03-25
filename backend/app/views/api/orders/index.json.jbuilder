json.orders do 
    @orders.each do |order|
        json.set! order.id do
            json.extract! order, :user_id, :id, :price, :address_id, :vendor_id, :status, :appointment_at, :options_snapshot, :updated_at
        end
    end 
end