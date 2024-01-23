import { useEffect, useState } from 'react';
import './AppointmentScheduling.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, format, parseISO, setHours, setMinutes } from 'date-fns';

const AppointmentScheduling = ({schedulingOpen, calendarIntegration}) => {
    const [calendarData, setCalendarData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    let formattedDate = format(startDate, "M/d/yy");
    const handleDateChange = (date) => {
        setStartDate(date);
    };

    useEffect(()=>{
        if(calendarIntegration){
            handleEventsRequest(calendarIntegration).then(console.log(calendarData))
        }
    },[calendarIntegration])

    useEffect(() => {
        if (calendarData && calendarData.length > 0) {
            setStartDate(parseISO(calendarData[0].start_time));
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

    const availableTimes = calendarData.map(entry => {
        const start = parseISO(entry.start_time);
        return start;
    });

    const availableDates = calendarData.map(entry => parseISO(entry.start_time));

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
                // minTime={new Date().setHours(8, 0, 0)}
                // maxTime={new Date().setHours(17, 0, 0)}
                // timeIntervals={120}
                // highlightDates={[addDays(new Date(), 8)]}
                // minDate={ addDays(new Date(), 2)}
                // maxDate={ addDays(new Date(), 20)}
                monthsShown={2}
                // includeTimes={[
                //     setHours(setMinutes(new Date(), 0), 17),
                //     setHours(setMinutes(new Date(), 30), 18),
                //     setHours(setMinutes(new Date(), 30), 19),
                //     setHours(setMinutes(new Date(), 30), 17),
                // ]}
                includeDates={availableDates}
                includeTimes={availableTimes}
            />
            <button className="scheduling-continue-button">Continue - {formattedDate}</button>
        </div>
    )
}

export default AppointmentScheduling;