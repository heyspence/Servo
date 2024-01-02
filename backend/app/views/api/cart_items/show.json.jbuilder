json.cart_item do 
    json.extract! @cart_item, :user_id, :service_id, :id
    json.price (@cart_item.service.price.round(2))
end

