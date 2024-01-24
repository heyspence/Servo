json.cart_item do 
    json.extract! @cart_item, :user_id, :service_id, :id, :price, :options, :address_id, :vendor_id, :status
end

