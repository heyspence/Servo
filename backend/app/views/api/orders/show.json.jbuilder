json.order do
    json.extract! @order, :user_id, :id, :price, :address_id, :vendor_id, :status, :appointment_at, :options_snapshot, :updated_at
end