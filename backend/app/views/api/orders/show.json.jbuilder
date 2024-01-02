json.order do
    json.extract! @order, :id, :vendor_id, :total, :user_id, :created_at
end