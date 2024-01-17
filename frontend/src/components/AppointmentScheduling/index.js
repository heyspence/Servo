import { useState } from 'react';
import './AppointmentScheduling.css'
import DatePicker from 'react-datepicker';
import { addDays, subDays } from 'date-fns';

const AppointmentScheduling = ({schedulingOpen}) => {
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (date) => {
        setStartDate(date);
    };
    return (
        <div className={`appointment-scheduling ${schedulingOpen ? '' : 'minimize' }`}>
            <DatePicker
                // inline
                selected={startDate}
                onChange={handleDateChange}
                // showTimeSelect
                // dateFormat="Pp"
                showIcon
                toggleCalendarOnIconClick
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24" 
                    viewBox="0 -960 960 960" 
                    width="24">
                        <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
                    </svg>
                }
                isClearable
                placeholderText="Select a Date"
                minTime={new Date().setHours(9, 0, 0)}
                maxTime={new Date().setHours(17, 0, 0)}
                timeIntervals={120}
                highlightDates={[addDays(new Date(), 8)]}
                minDate={ new Date()}
                maxDate={ addDays(new Date(), 545)}
                monthsShown={2}
            />
        </div>
    )
}

export default AppointmentScheduling;