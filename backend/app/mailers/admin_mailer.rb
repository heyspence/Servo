class AdminMailer < ApplicationMailer
    default to: 'spencer@bookservo.com'
    def new_user(user)
        @user = user
        mail(subject: "New Account: #{@user.email}")
    end

    def new_user_login(user)
        @user = user
        mail(subject: "New User Login: #{@user.email}")
    end

    def contact_us_email(message)
        @message = message[:message]
        @name = message[:name]
        @email = message[:email]
        subject = message[:subject]
        mail(subject: "SERVO: #{subject} from #{@name}")
    end

    def new_order(order)
        @order = order
        @vendor = Vendor.find(order.vendor_id)
        # Generate work order pdf
        file_path = PdfGenerator.generateWorkOrder(@order)
        # Attach pdf to email
        attachments["WO#{order.id}.pdf"] = File.read(file_path)
        # Send email
        mail(subject: "You Received an Order - $#{sprintf('%.2f', (@order.price + (ENV['SERVO_SERVICE_CHARGE']).to_f))}")
        # Delete pdf
        File.delete(file_path) if File.exist?(file_path)
    end
end
