import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import './AppointmentScheduling.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { format, getDay, isSameDay, parseISO } from 'date-fns';
import { updateCartItem } from '../store/cart';

const AppointmentScheduling = ({schedulingOpen, calendarIntegration, cartItem, onContinue}) => {
    const dispatch = useDispatch();
    const [calendarData, setCalendarData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [availableTimes, setAvailableTimes] = useState([]);
    const [windowSize, setWindowSize] = useState({width: undefined, height: undefined})
    let isMobile = windowSize.width < 1325
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

    const handleContinueClick = async () => {
        let cartItemData = {
            ...cartItem,
            appointmentAt: startDate,
            status: 'scheduled'
        }
        let cartItemObject = {
            cartItem: cartItemData
        }

        cartItemObject.cartItem.id = cartItem.id

        dispatch(updateCartItem(cartItemObject))
        onContinue({bypass: true})
    }

    const availableDates = calendarData.map(entry => parseISO(entry.start_time));

    return (
        <div className={`appointment-scheduling ${schedulingOpen ? '' : 'minimize' }`}>
            <div className="scheduling-container">
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
                    monthsShown={isMobile ? 1 : 2}
                    includeDates={availableDates}
                    includeTimes={availableTimes}
                />
                <button className="scheduling-continue-button" onClick={handleContinueClick}>Continue - {formattedDate}</button>
            </div>
        </div>
    )
}

export default AppointmentScheduling;