json.reviews do
    @reviews.each do |review|
        json.set! review.id do
            json.extract! review, :id, :vendor_id, :user_id, :body, :score, :created_at
        end
    end
end
