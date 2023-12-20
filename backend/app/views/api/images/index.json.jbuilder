json.images do
    @images.each do |image|
        json.set! image.id do
            json.extract! image, :id, :restaurant_id, :url, :alt, :image_type
        end
    end
end