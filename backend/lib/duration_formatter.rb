class DurationFormatter
    def self.format_duration(decimal)
        hours = decimal.floor
        minutes = ((60 * (decimal % 1)) / 5).round * 5
        
        if hours > 0 && minutes > 0
            "#{hours} Hours and #{minutes} Minutes"
        elsif hours > 0 && minutes == 0
            "#{hours}#{hours > 1 ? ' Hours' : ' Hour'}"
        else
            "#{minutes} Minutes"
        end
    end
end