total = 0
json.cart_items do
    @cart_items.each do |cart_item|
        json.set! cart_item.id do
            json.extract! cart_item, :user_id, :menu_item_id, :id
            json.price cart_item.menu_item.price
            total += cart_item.menu_item.price
        end
    end
end
json.total_price total.round(2)