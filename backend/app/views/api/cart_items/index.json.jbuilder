total = 0
json.cart_items do
    @cart_items.each do |cart_item|
        json.set! cart_item.id do
            json.extract! cart_item, :user_id, :service_id, :id, :price, :options, :address_id, :vendor_id, :status, :appointment_at
            json.extract! cart_item.service, :name
            if cart_item.status == 'pending'
                total += cart_item.price
            end
        end
    end
end
json.total_price total.round(2)