class Api::ContactController < ApplicationController
    def create 
        message = contact_params
        AdminMailer.contact_us_email(message).deliver_now
    end

    private
    def contact_params
        params.require(:message).permit(:name, :email, :message)
    end
end
