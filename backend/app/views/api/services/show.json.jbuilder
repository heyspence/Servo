json.set! @service.id do
    json.extract! @service, :id, :image_url, :name, :price
    json.vendor_id @service.vendor_id
    json.inputs do 
        service.inputs.each do |input|
            json.set! input.id do
                json.extract! input, :id, :name, :input_type
                json.options do
                    input.options.each do |option|
                        json.set! option.id do
                            json.extract! option, :option_type, :name, :value, :id
                        end
                    end
                end
            end
        end
    end
end