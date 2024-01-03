
@vendors.each do |vendor|
    @address = vendor.address
    json.set! vendor.id do
        json.extract! vendor, :id, :name, :image_url, :icon_image_url, :category, :phone_number, :email
        json.extract! @address, :longitude, :latitude, :address
        json.services vendor.services.map(&:id)
    end
end