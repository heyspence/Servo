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

    def update
        # debugger
        @address = Address.find(params[:id])
        if @address.update(address_params)
            render :show, status: :ok
        else
            render json: { errors: @address.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    private 
    def address_params
        params.require(:address).permit(:id, :longitude, :latitude, :street_address, :street_address_2, :city, :zip_code, :state, :default, :addressable_type, :addressable_id)
    end
      
end
