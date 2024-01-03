# json.services do
@services.each do |service|
    json.set! service.id do
        json.extract! service, :id, :name, :price, :image_url, :vendor_id
        json.inputs do service.inputs.each do |input|
            json.set! input.id do
                json.extract! input, :id, :name, :input_type
            end
        end
    end
end
# end