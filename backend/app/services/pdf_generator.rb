class PdfGenerator
    def self.generateWorkOrder(order)
        vendor = Vendor.find(order.vendor_id)
        client = User.find(order.user_id)
        # this needs to be refactored to support multiple addresses
        client_address = client.addresses[0]

        file_name = "WO##{order.id}.pdf"
        file_path = Rails.root.join('tmp', 'work_orders', file_name)

        Prawn::Document.generate(file_path) do |pdf|
            pdf.image Rails.root.join("public", "logo_blue_yellow.jpg"), at: [pdf.bounds.right - 150, pdf.cursor], width: 135, height: 45
            pdf.move_down 117
            pdf.bounding_box([pdf.bounds.right - 160, pdf.cursor], width: 160, height: 70) do
                pdf.text "Service Provider", size: 14, style: :bold
                pdf.move_down 5
                pdf.text "#{vendor.name}"
                pdf.text "Vendor ID: #{vendor.id}"
            end
            pdf.move_cursor_to pdf.bounds.top
            pdf.bounding_box([0, pdf.cursor], width: 300, height: 105) do
                pdf.text "Work Order ##{order.id}", size: 20, style: :bold
                pdf.move_down 10
                pdf.text "Booking Details", size: 14, style: :bold
                pdf.move_down 5
                pdf.formatted_text [
                { text: "Date and Time: " },
                { text: "#{order.appointment_at}", color: "f2bb46", styles: [:bold] }
                ]
                pdf.text "Estimated Duration: 2 hours 15 minutes"
            end
                pdf.move_down 10
                pdf.text "Service Recipient", size: 14, style: :bold
                pdf.move_down 5
                pdf.text "#{client.first_name} #{client.last_name}", size: 12
                pdf.text "#{client_address.street_address}", size: 12
                pdf.text "#{client_address.city} #{client_address.state}, #{client_address.zip_code}", size: 12
                pdf.text "(#{client.phone_number.slice(0,3)}) #{client.phone_number.slice(3,3)}-#{client.phone_number.slice(6,4)}"
                pdf.text "#{client.email}"

            # Move down to start the body section
            pdf.move_down 60

            pdf.text "=== FIX THIS BEFORE LAUNCH ===", align: :center
            pdf.text "todo: Refactor address to store with order.", align: :center
            pdf.text "todo: Include appointment time with order.", align: :center
            pdf.text "todo: Include options time with order.", align: :center

            pdf.move_down 60
            
            pdf.text "Order Placed: #{order.created_at.strftime('%B %d, %Y')}"
            pdf.text "Service Total: $#{sprintf('%.2f', (order.price * (1 - ENV["SERVO_VENDOR_COMMISSION"].to_f)))}", style: :bold
            pdf.move_down 10

            footer_height = 30 # Height of the footer box
            footer_padding = 10 # Padding inside the footer box
            footer_y_position = pdf.bounds.bottom + footer_height

            # Draw a gray rectangle for the footer background
            pdf.fill_color "CCCCCC" # Light gray color
            pdf.fill_rectangle([0, footer_y_position], pdf.bounds.width, footer_height)

            # Reset fill color for the text
            pdf.fill_color "000000" # Black color for the text

            # Position and print the footer text with padding
            pdf.bounding_box([footer_padding, footer_y_position - footer_padding], width: pdf.bounds.width - (2 * footer_padding), height: footer_height) do
                pdf.text "If you have any questions about this order, please contact spencer@bookservo.com.", align: :center, size: 10
            end
        end
        file_path
    end
end