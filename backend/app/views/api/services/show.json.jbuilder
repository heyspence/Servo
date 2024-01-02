json.set! @service.id do
    json.extract! @service, :id, :image_url, :name, :price
    json.vendor_id @service.vendor_id
end