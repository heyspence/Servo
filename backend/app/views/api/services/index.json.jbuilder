# json.services do
@services.each do |service|
    json.set! service.id do
        json.extract! service, :id, :name, :price, :image_url
        json.vendor_id service.vendor_id
    end
end
# end