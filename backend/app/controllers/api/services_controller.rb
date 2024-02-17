class Api::ServicesController < ApplicationController

    def index
        @vendor = Vendor.find(params[:vendor_id])
        @services = @vendor.services
        render :index
    end

    def show
        @service = Service.find(params[:id])
        @inputs = @service.inputs
        render :show
    end
end
