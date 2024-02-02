json.reviews do
    json.set! @review.id do
        json.extract! @review, :id, :vendor_id, :user_id, :body, :score
    end
end