class VendorMailer < ApplicationMailer
    def work_order(order)
        vendor = Vendor.find(order.vendor_id)
        file_name = "WO#{order.id}.pdf"
        file_path = Rails.root.join('tmp', 'work_orders', file_name)

        Prawn::Document.generate(file_path) do |pdf|
            pdf.text "Purchase Order #{order.id}"
        end
        attachments[file_name] = File.read(file_path)
        mail(to: 'spencer@bookservo.com', subject: "Work Order ##{order.id}")
    end
end