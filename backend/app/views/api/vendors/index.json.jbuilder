
@vendors.each do |vendor|
    address = vendor.address
    json.set! vendor.id do
        json.extract! vendor, :id, :name, :thumbnail_image_url, :logo_image_url, :category, :phone_number, :email, :min_price, :price_to_duration_rate, :pricing_formula
        json.address do
            json.extract! address, :longitude, :latitude, :street_address, :city, :state, :street_address_2, :zip_code, :default, :addressable_type, :addressable_id
        end
        json.calendar vendor.vendor_calendar.id if vendor.vendor_calendar.present?
    end
end