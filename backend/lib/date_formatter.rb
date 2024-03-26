class DateFormatter
    def self.custom_format_datetime(datetime)
        day_format = case datetime.day
                        when 1, 21, 31
                        "#{datetime.day}st"
                        when 2, 22
                        "#{datetime.day}nd"
                        when 3, 23
                        "#{datetime.day}rd"
                        else
                        "#{datetime.day}th"
                        end
        
        datetime.strftime("%A, %B #{day_format} @ %l:%M%P")
    end
end