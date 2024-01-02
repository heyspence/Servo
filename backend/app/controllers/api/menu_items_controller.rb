class Api::MenuItemsController < ApplicationController

    def index
        @vendor = Vendor.find(params[:vendor_id])
        @menu_items = @vendor.menu_items
        render :index
    end

    def show
        @menu_item = MenuItem.find(params[:id])
        render :show
    end
end
