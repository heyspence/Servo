json.orders do 
    @orders.each do |order|
        json.set! order.id do
            json.extract! order, :id, :user_id, :restaurant_id, :total, :created_at
        end
    end
end