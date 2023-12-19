json.set! @restaurant.id do
    json.extract! @restaurant, :id, :name, :image_url, :icon_image_url, :category, :phone_number, :email
    json.extract! @address, :longitude, :latitude, :address
end