total = 0
json.bookings do
    @bookings.each do |booking|
        json.set! booking.id do
            json.extract! booking, :user_id, :id, :price, :address_id, :vendor_id, :status, :appointment_at, :options_snapshot
            if booking.status == 'pending'
                total += booking.price
            end
        end
    end
end