json.cart_item do 
    json.extract! @cart_item, :user_id, :menu_item_id, :id
    json.price (@cart_item.menu_item.price.round(2))
end

