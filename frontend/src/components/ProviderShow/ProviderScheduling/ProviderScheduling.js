import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import './ProviderScheduling.css'
import DatePicker from 'react-datepicker';
import { addDays, format, getDay, isSameDay, parseISO } from 'date-fns';
import { updateCartItem } from '../../store/cart';
import 'react-datepicker/dist/react-datepicker.css'

const ProviderScheduling = ({schedulingOpen, calendarIntegration, cartItem, onContinue}) => {
    const dispatch = useDispatch();
    const [calendarData, setCalendarData] = useState([]);
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
        if(calendarIntegration){
            if(isSameDay(startDate, date)){
                setStartDate(date)
            }else{
                setStartDate(updateAvailableTimes(date)[0]);
            }
        }else{
            setStartDate(date)
        }
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

    let conditionalProps = {};
    const currentTime = new Date();

    if(calendarIntegration){
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
                    {...conditionalProps}
                />
                <button className="scheduling-continue-button" onClick={handleContinueClick}>Continue - {formattedDate}</button>
            </div>
        </div>
    )
}

export default ProviderScheduling;