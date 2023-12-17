json.order do
    json.extract! @order, :id, :restaurant_id, :total, :user_id, :created_at
end