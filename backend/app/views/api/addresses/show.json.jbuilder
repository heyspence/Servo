json.address do
    json.extract! @address, :longitude, :latitude, :address, :default, :addressable_type, :addressable_id
end