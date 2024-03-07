json.set! @vendor.id do
    json.extract! @vendor, :id, :name, :thumbnail_image_url, :logo_image_url, :category, :phone_number, :email, :min_price, :price_to_duration_rate, :pricing_formula
    json.pricing_inputs do 
        @vendor.pricing_inputs.each do |input|
            json.set! input.id do
                json.extract! input, :id, :name, :input_type, :required, :recurring, :alias
                json.pricing_input_options do
                    input.pricing_input_options.each do |option|
                        json.set! option.id do
                            json.extract! option, :option_type, :name, :value, :id, :pricing_input_id, :default
                        end
                    end
                end
            end
        end
    end
    json.address do 
        json.extract! @address, :longitude, :latitude, :street_address, :city, :state, :street_address_2, :zip_code, :default, :addressable_type, :addressable_id
    end
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
    if @booking.present?
        json.booking do 
            json.extract! @booking, :user_id, :id, :price, :options_snapshot, :address_id, :vendor_id, :status, :appointment_at
        end   
    end 
    json.calendar do
        json.extract! @calendar, :id, :vendor_id, :booking_window_start_days, :booking_window_end_days, :workday_start_time, :workday_end_time, :drive_time_buffer_mins, :api_integrated
    end
end