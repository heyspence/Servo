import { useEffect, useState } from 'react';
import './AppointmentScheduling.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { format, getDay, isSameDay, parseISO } from 'date-fns';

const AppointmentScheduling = ({schedulingOpen, calendarIntegration, cartItem}) => {
    const [calendarData, setCalendarData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [availableTimes, setAvailableTimes] = useState([]);
    let startTimesList = calendarData.map(entry => parseISO(entry.start_time))
    let formattedDate = format(startDate, "M/d/yy");

    const handleDateChange = (date) => {
        setStartDate(updateAvailableTimes(date)[0]);
    };

    useEffect(()=>{
        if(calendarIntegration){
            handleEventsRequest(calendarIntegration)
        }
    },[calendarIntegration])

    useEffect(() => {
        if (calendarData && calendarData.length > 0) {
            setStartDate(parseISO(calendarData[0].start_time));
            updateAvailableTimes(parseISO(calendarData[0].start_time))
        }
    }, [calendarData]);

    const handleEventsRequest = async (vendorId) => {
        const res = await fetch(`/api/vendors/${vendorId}/vendor_calendars`)
        if(res.ok){
            let data = await res.json();
            setCalendarData(data)
        }else{
            console.log(res)
        }
    };

    const updateAvailableTimes = (dateTime) => {
        const filteredData = startTimesList
            .filter(time => isSameDay(time, dateTime))
        setAvailableTimes(filteredData)
        return filteredData
    };

    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    };

    const availableDates = calendarData.map(entry => parseISO(entry.start_time));

    return (
        <div className={`appointment-scheduling ${schedulingOpen ? '' : 'minimize' }`}>
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
                // minTime={new Date().setHours(8, 0, 0)}
                // maxTime={new Date().setHours(17, 0, 0)}
                // timeIntervals={120}
                // highlightDates={[addDays(new Date(), 8)]}
                // minDate={ addDays(new Date(), 2)}
                // maxDate={ addDays(new Date(), 20)}
                filterDate={isWeekday}
                monthsShown={2}
                includeDates={availableDates}
                includeTimes={availableTimes}
            />
            <button className="scheduling-continue-button">Continue - {formattedDate}</button>
        </div>
    )
}

export default AppointmentScheduling;