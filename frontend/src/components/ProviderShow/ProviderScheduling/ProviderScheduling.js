import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import './ProviderScheduling.css'
import DatePicker from 'react-datepicker';
import { addDays, format, getDay, isSameDay, parseISO } from 'date-fns';
import { updateBooking } from '../../store/bookings';
import 'react-datepicker/dist/react-datepicker.css'

const ProviderScheduling = ({schedulingOpen, calendarData = [], booking, onContinue}) => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [availableTimes, setAvailableTimes] = useState([]);
    const [windowSize, setWindowSize] = useState({width: undefined, height: undefined})
    const availableDates = calendarData.map(entry => parseISO(entry.start_time));
    let isMobile = window.innerWidth < 1325;
    let startTimesList = calendarData.map(entry => parseISO(entry.start_time));
    let formattedDate = format(startDate, "M/d/yy");
    let formattedHeader = isMobile
            ? format(startDate, "EEE, MMM do @ h:mmaaa")
            : format(startDate, "EEEE, MMMM do @ h:mmaaa");

    const handleDateChange = (date) => {
        if(calendarData.length > 0){
            if(isSameDay(startDate, date)){
                setStartDate(date)
            }else{
                setStartDate(updateAvailableTimes(date)[0]);
            }
        }else{
            setStartDate(date)
        }
    };

    useEffect(() => {
        if (calendarData.length > 0) {
            setStartDate(parseISO(calendarData[0].start_time));
            updateAvailableTimes(parseISO(calendarData[0].start_time))
        }
    }, [calendarData]);

    useEffect(()=>{
        const handleResize = () => {
            setWindowSize({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize);
    },[])

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

    const handleContinueClick = async () => {
        let bookingData = {
            ...booking,
            appointmentAt: startDate,
            status: 'scheduled'
        }
        let bookingObject = {
            booking: bookingData
        }

        bookingObject.booking.id = booking.id

        dispatch(updateBooking(bookingObject))
        onContinue({bypass: true})
    }

    let conditionalProps = {};
    const currentTime = new Date();

    if(calendarData && calendarData.length > 0){
        conditionalProps = {
            includeDates: availableDates,
            includeTimes: availableTimes
        }
    }else{
        conditionalProps = {
            minTime: new Date(currentTime).setHours(8, 0, 0),
            maxTime: new Date(currentTime).setHours(17, 0, 0),
            timeIntervals: 120,
            // highlightDates: [addDays(currentTime, 8)],
            minDate: addDays(currentTime, 2),
            maxDate: addDays(currentTime, 365),
            filterDate: isWeekday
        }
    }

    return (
        <div className={`appointment-scheduling ${schedulingOpen ? '' : 'minimize' }`}>
            <div className="scheduling-container">
                <div className="scheduling-output">
                    {formattedHeader}
                </div>
                <DatePicker
                    inline
                    selected={startDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select a Date"
                    monthsShown={isMobile ? 1 : 2}
                    disabledKeyboardNavigation
                    {...conditionalProps}
                />
                <button className="scheduling-continue-button" onClick={handleContinueClick}>Continue - {formattedDate}</button>
            </div>
        </div>
    )
}

export default ProviderScheduling;