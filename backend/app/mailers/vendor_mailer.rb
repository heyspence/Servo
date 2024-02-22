class VendorMailer < ApplicationMailer
    def work_order(order)
        @order = order
        @client = User.find(order.user_id)
        @vendor = Vendor.find(order.vendor_id)
        @address = @client.addresses[0]
        # Generate work order pdf
        file_path = PdfGenerator.generateWorkOrder(order)
        # Attach pdf to email
        attachments["WO#{order.id}.pdf"] = File.read(file_path)
        # Send email
        mail(to: 'spencer@bookservo.com', subject: "Work Order Notification - ##{order.id}")
        # Delete pdf
        File.delete(file_path) if File.exist?(file_path)
    end
end