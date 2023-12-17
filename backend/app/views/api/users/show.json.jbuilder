json.user do
    json.extract! @user, :id, :first_name, :last_name, :email, :phone_number, :country, :created_at, :updated_at
end