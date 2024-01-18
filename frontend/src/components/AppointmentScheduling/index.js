import { useState } from 'react';
import './AppointmentScheduling.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, format } from 'date-fns';

const AppointmentScheduling = ({schedulingOpen}) => {
    const [startDate, setStartDate] = useState(addDays(new Date(), 2));
    let formattedDate = format(startDate, "M/d/yy @h:mmaaa")

    const handleDateChange = (date) => {
        setStartDate(date);
    };
    return (
        <div className={`appointment-scheduling ${schedulingOpen ? '' : 'minimize' }`}>
            {/* <h3>Instant Scheduling</h3> */}
            <div className="scheduling-output">
                {format(startDate, "EEEE, MMMM do @h:mmaaa")}
            </div>
            <DatePicker
                inline
                selected={startDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select a Date"
                minTime={new Date().setHours(9, 0, 0)}
                maxTime={new Date().setHours(17, 0, 0)}
                timeIntervals={120}
                highlightDates={[addDays(new Date(), 8)]}
                minDate={ addDays(new Date(), 2)}
                maxDate={ addDays(new Date(), 545)}
                monthsShown={2}
            />
            <button className="scheduling-continue-button">Continue - {formattedDate}</button>
        </div>
    )
}

export default AppointmentScheduling;