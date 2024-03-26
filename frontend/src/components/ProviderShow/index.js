import './ProviderShow.css'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect, useMemo, useState } from 'react'
import { isLoggedIn } from '../store/session'
import { fetchCalendarData, fetchVendor } from '../store/vendor'
import ProviderPricing from './ProviderPricing/ProviderPricing'
import ProviderScheduling from './ProviderScheduling/ProviderScheduling'
import Modal from '../Modal'
import ReviewForm from '../Reviews/ReviewForm'
import { updateBooking } from '../store/bookings'
import { addDays, format, parseISO } from 'date-fns'
import ProviderSummary from './ProviderSummary/ProviderSummary'
import ProviderGallery from './ProviderGallery/ProviderGallery'
import ProviderReviews from './ProviderReviews/ProviderReviews'
import PaymentGateway from '../checkout/paymentGateway/PaymentGateway'
import { useQueryParams } from '../../util/urlQueryParams'
import ProviderMeta from './ProviderMeta/ProviderMeta'

const ProviderShow = () => {
    // const [seeMoreModalOpen, setSeeMoreModalOpen] = useState(false);
    const { id }= useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const queryParams = useQueryParams();
    const { vendor, calendarData, userLoggedIn, serviceCharge } = useSelector(state => {
        return {
            vendor: state.vendors[id],
            calendarData: state?.vendors 
            && state.vendors[id]?.calendarData 
            ? state.vendors[id].calendarData 
            : [],
            userLoggedIn: isLoggedIn(state),
            serviceCharge: state.session.user?.serviceCharge
        }
    })
    const reviews = vendor?.reviews ? Object.values(vendor.reviews) : [];

    // Grab existing booking (if any) that have a state of "priced", "scheduled", or "pending"
    const vendorBooking = useSelector(state => {
        return Object.values(state.bookings).find(item => {
            const parsedId = parseInt(id, 10);
            return item?.vendorId === parsedId && 
                   item?.status !== 'paid' && 
                   item?.status !== 'completed';
        });
    });

    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [paymentGatewatOpen, setPaymentGatewayOpen] = useState(false);
    const [openComponent, setOpenComponent] = useState({
        pricing: false, 
        scheduling: false, 
        summary: false
    });

    const nextAvailableAppointment = calendarData.length > 0 ? parseISO(calendarData[0].start_time) : addDays(new Date(), 2);
    const formattedNextAvailableAppointment = format(nextAvailableAppointment, "EEE, MMM do");
    const bookingStatus = vendorBooking?.status;
    const allComponentsClosed = Object.values(openComponent).every(val => val === false);
    let isMobile = window.innerWidth < 700;
    
    useEffect(() => {
        if(!userLoggedIn){
            history.push('/')
        }else{
            dispatch(fetchVendor(id));
        }
    }, [dispatch, id, history, userLoggedIn]);

    useEffect(()=>{
        if(!vendor) return
        if(vendor.calendar.apiIntegrated === true){
            dispatch(fetchCalendarData(id));
        }
    }, [vendor])

    useEffect(()=>{
        setPaymentGatewayOpen(queryParams.open_payment_gateway)
    }, [])

    // Reviews util function
    let { reviewCount, reviewAverage } = useMemo(()=>{
        let reviewCount = 0
        let total = 0
        reviews.forEach(review => {
            reviewCount++
            total += review.score
        })
        let reviewAverage = (total / reviewCount).toFixed(1)
        return ({
            reviewAverage,
            reviewCount
        })
    }, [reviews])


    // Click handlers
    const handleScheduleClick = ({bypass}) => {
        if(bookingStatus && !openComponent.pricing || bypass){
            setOpenComponent({
                pricing: false,
                scheduling: true,
                summary: false
            })
        }
    }

    const handleGetPriceClick = () => {
        setOpenComponent({
            pricing: true,
            scheduling: false,
            summary: false
        })
    }

    const handleSummaryClick = ({ bypass = false } = {}) =>{
        if(((bookingStatus === 'scheduled' || bookingStatus === 'pending') && 
            !openComponent.scheduling) || 
            bypass
        ){
            setOpenComponent({
                pricing: false,
                scheduling: false,
                summary: true
            })
        }
    }

    const handleCheckout = () => {
        let bookingData = {
            ...vendorBooking,
            status: 'pending'
        }
        dispatch(updateBooking({booking: bookingData}));
        setPaymentGatewayOpen(true);
        setOpenComponent({
            pricing: false,
            scheduling: false,
            summary: false
        })
    }

    let formattedDate = () =>{
        if(vendorBooking?.appointmentAt){
            return isMobile
            ? format(parseISO(vendorBooking?.appointmentAt), "MMM do @ h:mm")
            : format(parseISO(vendorBooking?.appointmentAt), "EEEE, MMMM do @ h:mmaaa");
        }else{
            return "--"
        }
    }

    const toggleReviewModal = () => {
        setReviewModalOpen(!reviewModalOpen)
    }

    const togglePaymentGateway = () => {
        setPaymentGatewayOpen(!paymentGatewatOpen)
    }


    const basePricingDiv = <div className="pricing-preview">
                                Starting at: <br/>${vendor?.minPrice ? vendor.minPrice : "--"}
                            </div>
    const confirmedPricingDiv = <div className="pricing-preview--confirmed">
                                    Custom Quote<div className="green-text"> ${vendorBooking?.price.toFixed(2)}</div>
                                </div>

    const defaultSchedulingDiv = <div className="scheduling-preview">Next Available Appointment: 
                                    <br/>
                                    {formattedNextAvailableAppointment}
                                </div>

    const confirmedSchedulingDiv = <div className="scheduling-preview--confirmed">
                                            <div>Service Date</div>
                                            <p className="green-text">{formattedDate()}</p>
                                    </div>       
    
    return (
        <>
            <div className="provider-show-container">
                <div className="provider-show">
                    <div className="provider-show-left">
                        <ProviderMeta vendor={vendor} reviewCount={reviewCount} reviewAverage={reviewAverage} />
                        <ProviderReviews toggleReviewModal={toggleReviewModal} id={id} />
                        <div className="disclaimer">
                            At Servo, we ensure a seamless connection with skilled professionals. 
                            It's important to remember that Servo is a facilitator of these 
                            important interactions. For clarity on our role and responsibilities, 
                            we encourage you to review our Terms of Service. Your privacy matters to us; 
                            our Privacy Policy is designed with your security and trust in mind.
                        </div>
                    </div>

                    <div className="provider-show-right">
                        <ProviderGallery id={id} />
                        <ProviderPricing
                                    pricingOpen={openComponent.pricing}
                                    onContinue={handleScheduleClick}
                                    vendor={vendor}
                                    booking={vendorBooking}
                        />
                        <div className={`provider-pricing ${openComponent.pricing ? 'minimize' : ''}`}>
                            <img className="provider-price-icon" 
                            src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-04.png" 
                            alt="get price icon servo instance price" />
                            {vendorBooking ? confirmedPricingDiv : basePricingDiv}
                            <button onClick={handleGetPriceClick} 
                                    className={`get-price-button green-out 
                                    ${vendorBooking ? 'anchor-style' : ''}`}
                            >
                                {vendorBooking ? 'Edit Service' : '1. Get Price'}
                            </button>
                        </div>
                        <ProviderScheduling schedulingOpen={openComponent.scheduling} 
                                                calendarIntegration={vendor ? vendor.calendar.apiIntegrated : false}
                                                calendarData={calendarData} 
                                                booking={vendorBooking}
                                                onContinue={handleSummaryClick}
                        />
                        <div className={`provider-scheduling ${openComponent.scheduling ? 'minimize' : ''}`}>
                            <img className="provider-calendar-icon" 
                            src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-08.png" 
                            alt="schedule now servo icon" />
                                {(bookingStatus === 'scheduled' || bookingStatus === 'pending') 
                                ? confirmedSchedulingDiv 
                                : defaultSchedulingDiv}
                            <button onClick={handleScheduleClick} 
                                    className={`schedule-button green-out
                                                ${(vendorBooking && !openComponent.pricing) 
                                                ? '' 
                                                : 'gray-out'} 
                                                ${(bookingStatus && bookingStatus !== 'priced')
                                                 ? 'anchor-style' 
                                                : ''}`}
                            >
                                {(bookingStatus && bookingStatus !== 'priced') 
                                ? 'Edit Booking' 
                                : '2. Schedule'}
                            </button>
                        </div>
                        <ProviderSummary summaryOpen={openComponent.summary} 
                                booking={vendorBooking} 
                                vendor={vendor}
                                onCheckout={handleCheckout}
                                serviceCharge={serviceCharge}
                        />
                        <div className={`provider-summary ${openComponent.summary ? 'minimize' : ''}`} >
                            <img className="provider-summary-icon" 
                            src={"https://spencerheywood.com/images/servo/icons/icons-07.png"} 
                            alt="mobile checkout icon" />
                            <div className="summary-preview">Summary</div>
                            <button className={`${vendorBooking && 
                                                (bookingStatus !== 'priced' && allComponentsClosed) 
                                                ? 'green-out' 
                                                : 'gray-out'}`} 
                                                onClick={handleSummaryClick}>
                                {bookingStatus === 'scheduled' || bookingStatus === 'pending' ? 'Continue' : '3. Checkout'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={paymentGatewatOpen} onClose={togglePaymentGateway}>
                <PaymentGateway booking={vendorBooking} />
            </Modal>
        </>
    )
}

export default ProviderShow;