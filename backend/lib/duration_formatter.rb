class DurationFormatter
    def self.format_duration(decimal)
        hours = decimal.floor
        minutes = ((60 * (decimal % 1)) / 5).round * 5
        
        if hours > 0 && minutes > 0
            "#{hours} hours and #{minutes} minutes"
        elsif hours > 0 && minutes == 0
            "#{hours}#{hours > 1 ? ' hours' : ' hour'}"
        else
            "#{minutes} minutes"
        end
    end
end