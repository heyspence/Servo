# json.menu_items do
@menu_items.each do |menu_item|
    json.set! menu_item.id do
        json.extract! menu_item, :id, :name, :price, :image_url
        json.restaurant_id menu_item.restaurant_id
    end
end
# end