class Api::AddressesController < ApplicationController
    def create
        @address = Address.new(address_params)
        id = current_user[:id]
        
        if @address.addressable_id == id
            if @address.save
                render :show
            else
                render json: { errors: @address.errors.full_messages }, status: 422
            end
        else
            render json: { errors: ["Addressable ID mismatch"] }, status: 422
        end
    end    
    

    private 
    def address_params
        normal_params = params.require(:address).permit(:longitude, :latitude, :street_address, :street_address_2, :city, :zip_code, :state, :default, :addressable_type, :addressable_id)
      end
      
end
