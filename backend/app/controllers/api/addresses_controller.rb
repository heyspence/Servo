class Api::AddressesController < ApplicationController
    def create
        @address = Address.new(address_params)
        id = current_user[:id]
        if @address.addressable_id == id && @address.save 
            render :show
        else
            render json: { errors: @address.errors.full_messages }, status: 422
        end
    end

    private 
    def address_params
        # Start with strong parameters
        normal_params = params.require(:address).permit(:longitude, :latitude, :address, :default, :addressable_type, :addressable_id)
      end
      
end
