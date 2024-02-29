json.booking do 
    json.extract! @booking, :user_id, :id, :price, :address_id, :vendor_id, :status, :appointment_at, :options_snapshot
    # if @user && @user.stripe_customer_id
    #     json.stripe_customer_id @user.stripe_customer_id
    # end
end

