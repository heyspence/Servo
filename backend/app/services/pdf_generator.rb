class PdfGenerator
    WORK_ORDERS_PATH = ENV['WORK_ORDER_PATH']
    def self.generatePdf(data)
        file_name = "WO#{data.id}.pdf"
        file_path = File.join(WORK_ORDERS_PATH, file_name)

        Prawn::Document.generate(file_path) do |pdf|
            pdf.text "Purchase Order #{data.id}"
        end
        file_path
    end
end