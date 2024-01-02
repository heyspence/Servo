json.set! @menu_item.id do
    json.extract! @menu_item, :id, :image_url, :name, :price
    json.vendor_id @menu_item.vendor_id
end