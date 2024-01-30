json.set! @vendor.id do
    json.extract! @vendor, :id, :name, :image_url, :icon_image_url, :category, :phone_number, :email
    json.extract! @address, :longitude, :latitude, :address
    json.images do
        @images.each do |image|
            json.set! image.id do
                json.extract! image, :id, :vendor_id, :url, :alt, :image_type
            end
        end
    end
    json.reviews do
        @reviews.each do |review|
            json.set! review.id do
                json.extract! review, :id, :vendor_id, :user_id, :body, :score
            end
        end
    end
    json.services do
        @services.each do |service|
            json.set! service.id do
                json.extract! service, :id, :name, :price, :image_url, :vendor_id, :formula
                json.inputs do 
                    service.inputs.each do |input|
                        json.set! input.id do
                            json.extract! input, :id, :name, :input_type, :required, :recurring
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
        end
    end
    if @cart_item.present?
        json.cart_item do 
            json.extract! @cart_item, :user_id, :service_id, :id, :price, :options, :address_id, :vendor_id, :status, :appointment_at
        end   
    end 
    json.calendar @calendar.id if @calendar.present?
end