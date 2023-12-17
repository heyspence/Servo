json.set! @menu_item.id do
    json.extract! @menu_item, :id, :image_url, :name, :price
    json.restaurant_id @menu_item.restaurant_id
end