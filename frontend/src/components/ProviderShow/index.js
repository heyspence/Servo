import './ProviderShow.css'
import { ReactComponent as StarSvg } from '../../assets/svg/reviewStar.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect, useMemo, useState } from 'react'
import { isLoggedIn } from '../store/session'
import { fetchCalendarData, fetchVendor } from '../store/vendor'
import ProviderPricing from './ProviderPricing/ProviderPricing'
import ProviderScheduling from './ProviderScheduling/ProviderScheduling'
import Modal from '../Modal'
import ReviewForm from '../Reviews/ReviewForm'
import { toggleCart, updateCartItem } from '../store/cart'
import { addDays, format, parseISO } from 'date-fns'
import ProviderSummary from './ProviderSummary/ProviderSummary'
import ProviderGallery from './ProviderGallery/ProviderGallery'
import ProviderReviews from './ProviderReviews/ProviderReviews'
import { formatPhoneNumber } from '../../util/formatting'
import PaymentGateway from '../checkout/paymentGateway/PaymentGateway'

const ProviderShow = () => {
    // const [seeMoreModalOpen, setSeeMoreModalOpen] = useState(false);
    // Hook calls
    const { id }= useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const { vendor, calendarData, userLoggedIn } = useSelector(state => {
        return {
            vendor: state.vendors[id],
            calendarData: state?.vendors && state.vendors[id]?.calendarData ? state.vendors[id].calendarData : [],
            userLoggedIn: isLoggedIn(state)
        }
    })
    const reviews = vendor?.reviews ? Object.values(vendor.reviews) : [];
    const vendorCartItem = useSelector(state =>
        Object.values(state.cart?.cartItems).find(item => item.vendorId === parseInt(id))
    );

    // States
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [reviewShowOpen, setReviewShowOpen] = useState(false);
    const [paymentGatewatOpen, setPaymentGatewayOpen] = useState(false);
    const [openComponent, setOpenComponent] = useState({
        pricing: false, 
        scheduling: false, 
        summary: false
    });

    // Variables
    const defaultService = vendor?.services ? Object.values(vendor.services)[0] : {};
    const nextAvailableAppointment = calendarData.length > 0 ? parseISO(calendarData[0].start_time) : addDays(new Date(), 2);
    const formattedNextAvailableAppointment = format(nextAvailableAppointment, "EEE, MMM do");
    const cartItemStatus = vendorCartItem?.status;
    const allComponentsClosed = Object.values(openComponent).every(val => val === false);
    const phoneNumber = vendor?.phoneNumber ? vendor.phoneNumber : '*********'
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    let isMobile = window.innerWidth < 700;

    // Map for category parsing
    const categoryMap = {
        window_cleaning: "Window Cleaning",
        house_cleaning: "House Cleaning",
        pest_control: "Pest Control",
        carpet_cleaning: "Carpet Cleaning",
        garbage_can_cleaning: "Garbage Can Cleaning",
        car_detailing: "Auto Detailing"
    }
    
    // useEffects
    useEffect(() => {
        if(!userLoggedIn){
            history.push('/')
        }else{
            dispatch(fetchVendor(id));
        }
    }, [dispatch, id, history, userLoggedIn]);

    useEffect(()=>{
        if(vendor?.calendar){
            dispatch(fetchCalendarData(id));
        }
    }, [vendor])

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
        if(cartItemStatus && !openComponent.pricing || bypass){
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
        if(((cartItemStatus === 'scheduled' || cartItemStatus === 'pending') && 
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
        let cartItemData = {
            ...vendorCartItem,
            status: 'pending'
        }
        let cartItemObject = {
            cartItem: cartItemData
        }
        dispatch(updateCartItem(cartItemObject));
        dispatch(toggleCart());
        setPaymentGatewayOpen(true);
    }

    // Helper functions
    let formattedDate = () =>{
        if(vendorCartItem?.appointmentAt){
            return isMobile
            ? format(parseISO(vendorCartItem?.appointmentAt), "MMM do @ h:mm")
            : format(parseISO(vendorCartItem?.appointmentAt), "EEEE, MMMM do @ h:mmaaa");
        }else{
            return "--"
        }
    }

    const closeAllComponents = () =>{
        setOpenComponent({
            pricing: false,
            scheduling: false,
            summary: false
        })
    }

    const toggleReviewModal = () => {
        setReviewModalOpen(!reviewModalOpen)
    }

    const togglePaymentGateway = () => {
        setPaymentGatewayOpen(!paymentGatewatOpen)
    }

    const toggleReviewShow = () => {
        setReviewShowOpen(!reviewShowOpen)
    }


    // Conditional element rendering
    const basePricingDiv = <div className="pricing-preview">
                                Starting at: <br/>${defaultService?.price ? defaultService.price : "--"}
                            </div>
    const confirmedPricingDiv = <div className="pricing-preview--confirmed">
                                    Custom Quote<div className="green-text"> ${vendorCartItem?.price.toFixed(2)}</div>
                                </div>

    const defaultSchedulingDiv = <div className="scheduling-preview">Next Available Appointment: <br/>{formattedNextAvailableAppointment}</div>

    const confirmedSchedulingDiv = <div className="scheduling-preview--confirmed">
                                            <div>Service Date</div>
                                            <p className="green-text">{formattedDate()}</p>
                                    </div>

    {/* <h2 className="provider-category">{categoryMap[vendor?.category]}</h2> */}         
    
    return (
        <>
            <div className="provider-show-container">
                <div className="provider-show">
                    <div className="provider-show-left">
                        <div className="meta-info-block">
                            <div className="provider-logo-background">
                                <img className="provider-logo" src={vendor?.iconImageUrl} />
                            </div>
                            <div className="meta-info-container">
                                <h1 className="provider-name">{vendor?.name ? vendor.name : "--"}</h1>
                                <p className="review-tag">{eval(reviewAverage) ? reviewAverage : "-.-"}
                                    <StarSvg className="review-star-svg"/>{reviewCount} ratings
                                </p>
                            </div>
                        </div>
                        <div className="location-details-container">
                            <p>{formattedPhoneNumber}</p>
                            <p style={{margin: "10px 0"}}>{vendor?.email ? vendor.email : '--'}</p>
                            <p>{vendor?.address ? vendor.address : '--'}</p>
                        </div>
                        <div className="promotions">
                            <h3 className="promotions-header">Promotions</h3>
                            <div className="promotion">Save $5 on $100 or more</div>
                            <div className="promotion">10% Off 2/Year Service</div>
                            <div className="promotion">15% Off 4/year service</div>
                        </div>
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
                        <ProviderPricing basePrice={defaultService?.price} 
                                            inputs={defaultService?.inputs} 
                                            service={defaultService} 
                                            pricingOpen={openComponent.pricing}
                                            onContinue={handleScheduleClick}
                                            cartItem={vendorCartItem}
                        />
                        <div className={`provider-pricing ${openComponent.pricing ? 'minimize' : ''}`}>
                            <img className="provider-price-icon" 
                            src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-04.png" 
                            alt="get price icon servo instance price" />
                            {vendorCartItem ? confirmedPricingDiv : basePricingDiv}
                            <button onClick={handleGetPriceClick} className="get-price-button">
                                {vendorCartItem ? 'Edit Service' : 'Get Price'}
                            </button>
                        </div>
                        <ProviderScheduling schedulingOpen={openComponent.scheduling} 
                                                calendarIntegration={vendor?.calendar ? id : false}
                                                calendarData={calendarData} 
                                                cartItem={vendorCartItem}
                                                onContinue={handleSummaryClick}
                        />
                        <div className={`provider-scheduling ${openComponent.scheduling ? 'minimize' : ''}`}>
                            <img className="provider-calendar-icon" 
                            src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-08.png" 
                            alt="schedule now servo icon" />
                            {cartItemStatus === 'scheduled' || cartItemStatus === 'pending' ? confirmedSchedulingDiv : defaultSchedulingDiv}
                            <button onClick={handleScheduleClick} className={`schedule-button ${(vendorCartItem && !openComponent.pricing) ? '' : 'gray-out'}`}>
                                {!!cartItemStatus ? 'Edit Booking' : 'Schedule'}
                            </button>
                        </div>
                        <ProviderSummary summaryOpen={openComponent.summary} 
                                cartItem={vendorCartItem} 
                                vendor={vendor}
                                onCheckout={handleCheckout}
                        />
                        <div className={`provider-summary ${openComponent.summary ? 'minimize' : ''}`} >
                            <img className="provider-summary-icon" 
                            src={"https://spencerheywood.com/images/servo/icons/icons-07.png"} 
                            alt="mobile checkout icon" />
                            <div className="summary-preview">Summary</div>
                            <button className={`secondary-summary-action-button 
                                                ${vendorCartItem && 
                                                (cartItemStatus !== 'priced' && allComponentsClosed) 
                                                ? '' 
                                                : 'gray-out'}`} 
                                                onClick={handleSummaryClick}>
                                {cartItemStatus === 'scheduled' || cartItemStatus === 'pending' ? 'Continue' : 'Checkout'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={reviewModalOpen} onClose={toggleReviewModal}>
                <ReviewForm vendorName={vendor?.name} vendorId={id} onClose={toggleReviewModal} />
            </Modal>
            <Modal isOpen={paymentGatewatOpen} onClose={togglePaymentGateway}>
                <PaymentGateway cartItem={vendorCartItem} vendorId={id} />
            </Modal>
            {/* <Modal isOpen={reviewShowOpen} onClose={toggleReviewShow}>
                <ReviewShow review={review} author={author} onClose={toggleReviewShow}/>
            </Modal> */}
        </>
    )
}

export default ProviderShow;