json.address do
    json.extract! @address, :id, :longitude, :latitude, :street_address, :city, :state, :street_address_2, :zip_code, :default, :addressable_type, :addressable_id
end