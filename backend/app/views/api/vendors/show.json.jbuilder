json.set! @vendor.id do
    json.extract! @vendor, :id, :name, :image_url, :icon_image_url, :category, :phone_number, :email
    json.extract! @address, :longitude, :latitude, :address
    json.calendar @calendar.id if @calendar.present?
end