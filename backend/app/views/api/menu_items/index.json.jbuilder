# json.menu_items do
@menu_items.each do |menu_item|
    json.set! menu_item.id do
        json.extract! menu_item, :id, :name, :price, :image_url
        json.vendor_id menu_item.vendor_id
    end
end
# end