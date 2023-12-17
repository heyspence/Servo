json.reviews do
    json.set! @review.id do
        json.extract! @review, :id, :restaurant_id, :user_id, :body, :score
    end
end