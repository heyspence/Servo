json.booking do 
    json.extract! @booking, :user_id, :id, :price, :address_id, :vendor_id, :status, :appointment_at, :options_snapshot
end

