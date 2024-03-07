
@vendors.each do |vendor|
    address = vendor.address
    calendar = vendor.vendor_calendar
    json.set! vendor.id do
        json.extract! vendor, :id, :name, :thumbnail_image_url, :logo_image_url, :category, :phone_number, :email, :min_price, :price_to_duration_rate, :pricing_formula
        json.address do
            json.extract! address, :longitude, :latitude, :street_address, :city, :state, :street_address_2, :zip_code, :default, :addressable_type, :addressable_id
        end
        json.calendar do
            json.extract! calendar, :id, :vendor_id, :booking_window_start_days, :booking_window_end_days, :workday_start_time, :workday_end_time, :drive_time_buffer_mins, :api_integrated
        end
    end
end