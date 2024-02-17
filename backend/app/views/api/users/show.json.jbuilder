json.user do
    json.extract! @user, :id, :first_name, :last_name, :email, :phone_number, :country, :vendor_id, :created_at, :updated_at
    json.addresses do 
        @user.addresses.each do |address|
            json.set! address.id do
                json.extract! address, :longitude, :latitude, :address, :default, :addressable_type, :addressable_id
            end
        end
    end
end