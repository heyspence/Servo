import './ProviderShow.css'
import { ReactComponent as StarSvg } from '../../assets/svg/reviewStar.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect, useState } from 'react'
import { isLoggedIn } from '../store/session'
import { fetchServices, fetchVendor } from '../store/vendor'
import { fetchReviews } from '../store/reviews'
import ReviewIndexItem from '../Reviews/ReviewIndexItem'
import ProviderPricing from './ProviderPricing/ProviderPricing'
import ProviderScheduling from './ProviderScheduling/ProviderScheduling'
import { fetchImages } from '../store/images'
import Modal from '../Modal'
import ReviewForm from '../Reviews/ReviewForm'
// import ReviewShow from '../Reviews/ReviewShow'
import { getCart, toggleCart, updateCartItem } from '../store/cart'
import { format, parseISO } from 'date-fns'
import ProviderSummary from './ProviderSummary/ProviderSummary'

const ProviderShow = () => {
    // const [seeMoreModalOpen, setSeeMoreModalOpen] = useState(false);
    const { id }= useParams();
    const userLoggedIn = useSelector(isLoggedIn);
    const history = useHistory();
    const dispatch = useDispatch();
    const vendor = useSelector((state)=> state.vendors[id]);
    const reviews = useSelector(state => state?.reviews ? Object.values(state.reviews) : []);
    const images = useSelector(state => state?.images ? Object.values(state.images) : []);
    const currentUserId = useSelector(state => state.session.user?.id);
    const defaultService = vendor?.services ? Object.values(vendor.services)[0] : {};
    const vendorCartItem = useSelector(state => Object.values(state.cart.cartItems).find(cartItem => cartItem.vendorId === parseInt(id, 10)));
    const cartItemStatus = vendorCartItem?.status
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [reviewShowOpen, setReviewShowOpen] = useState(false);
    const [openComponent, setOpenComponent] = useState({pricing: false, scheduling: false, summary: false})
    const allComponentsClosed = Object.values(openComponent).every(val => val === false)
    let isMobile = window.innerWidth < 700;

    const categoryMap = {
        window_cleaning: "Window Cleaning",
        house_cleaning: "House Cleaning",
        pest_control: "Pest Control",
        carpet_cleaning: "Carpet Cleaning",
        garbage_can_cleaning: "Garbage Can Cleaning",
        car_detailing: "Auto Detailing"
    }

    const phoneNumber = vendor?.phoneNumber
    const formattedPhoneNumber = "(" + phoneNumber?.slice(0, 3) + ") " + phoneNumber?.slice(3, 6) + "-" + phoneNumber?.slice(6, 10)

    if(!userLoggedIn) history.push('/')

    useEffect(() => {
        dispatch(fetchVendor(id))
        .then(() => {
            dispatch(fetchImages(id));
            dispatch(fetchReviews(id));
            dispatch(fetchServices(id));
            dispatch(getCart(currentUserId))
        })
        .catch((error) => {
            console.log(error)
        });
    }, [dispatch, id]);

    let reviewCount = 0
    let total = 0
    reviews.forEach(review => {
        reviewCount++
        total += review.score
    })
    let reviewAverage = (total / reviewCount).toFixed(1)

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

    const handleAddToCart = ({ bypass = false, checkout = false } = {}) =>{
        if((allComponentsClosed && 
            (cartItemStatus === 'scheduled' || cartItemStatus === 'pending')) || 
            bypass || 
            checkout
        ){
            let cartItemData = {
                ...vendorCartItem,
                status: 'pending'
            }
            let cartItemObject = {
                cartItem: cartItemData
            }
            dispatch(updateCartItem(cartItemObject))
            if(!checkout){
                dispatch(toggleCart());
            }
            closeAllComponents();
        }
    }

    const handleCheckout = () => {
        handleAddToCart({checkout: true})
        history.push(`/checkout`)
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

    const toggleReviewShow = () => {
        setReviewShowOpen(!reviewShowOpen)
    }

    const basePricingDiv = <div className="pricing-preview">
                                Starting at: <br/>${defaultService?.price ? defaultService.price : "--"}
                            </div>
    const confirmedPricingDiv = <div className="pricing-preview--confirmed">
                                    Custom Quote<div className="green-text"> ${vendorCartItem?.price.toFixed(2)}</div>
                                </div>

    const defaultSchedulingDiv = <div className="scheduling-preview">Next Available Appointment: <br/>Wed, Dec 24th</div>

    let formattedDate = () =>{
        if(vendorCartItem?.appointmentAt){
            return isMobile
            ? format(parseISO(vendorCartItem?.appointmentAt), "MMM do @ h:mm")
            : format(parseISO(vendorCartItem?.appointmentAt), "EEEE, MMMM do @ h:mmaaa");
        }else{
            return "--"
        }
    }

    const confirmedSchedulingDiv = <div className="scheduling-preview--confirmed">
                                            <div>Service Date</div>
                                            <p className="green-text">{formattedDate()}</p>
                                    </div>

    return (
        <>
            <h1 className="provider-category">{categoryMap[vendor?.category]}</h1>
            <div className="provider-show">
                <div className="provider-show-left">
                    <div className="meta-info-block">
                        <div className="provider-logo-background">
                            <img className="provider-logo" src={vendor?.iconImageUrl} />
                        </div>
                        <div className="meta-info-container">
                            <h2 className="provider-name">{vendor?.name}</h2>
                            <p className="review-tag">{eval(reviewAverage) ? reviewAverage : "-.-"}
                                <StarSvg className="review-star-svg"/>{ reviewCount} ratings
                            </p>
                        </div>
                    </div>
                    <div className="location-details-container">
                        <p>{formattedPhoneNumber}</p>
                        <p style={{margin: "10px 0"}}>{vendor?.email}</p>
                        <p>{vendor?.address}</p>
                    </div>
                    <div className="promotions">
                        <h3 className="promotions-header">Promotions</h3>
                        <div className="promotion">Save $5 on $100 or more</div>
                        <div className="promotion">10% Off 2/Year Service</div>
                        <div className="promotion">15% Off 4/year service</div>
                    </div>
                    <div className="reviews">
                        <h3 className="reviews-header">Reviews</h3>
                        <button className="vendor-review-button" onClick={toggleReviewModal}>Add a Review</button>
                        <div className="provider-review-index">
                            {reviews && reviews.map((review, index) => {
                                return <ReviewIndexItem review={review} key={index}/>
                            })}
                        </div>
                    </div>
                    <div className="disclaimer">
                        At Servo, we ensure a seamless connection with skilled professionals. 
                        It's important to remember that Servo is a facilitator of these 
                        important interactions. For clarity on our role and responsibilities, 
                        we encourage you to review our Terms of Service. Your privacy matters to us; 
                        our Privacy Policy is designed with your security and trust in mind.
                    </div>
                </div>

                <div className="provider-show-right">
                        <div className="gallery-container">
                        <h3 className="gallery-header">Gallery</h3>
                        <div className="provider-gallery">
                            {images && images.map((image, index) => {
                                return <img className="provider-photo" 
                                            src={image.url} alt={image.alt} 
                                            loading={index > 4 ? 'lazy' : undefined} 
                                            key={image.id} 
                                        />
                            })}
                        </div>
                    </div>
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
                                            cartItem={vendorCartItem}
                                            onContinue={handleSummaryClick}
                    />
                    <div className={`provider-scheduling ${openComponent.scheduling ? 'minimize' : ''}`}>
                        <img className="provider-calendar-icon" 
                        src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-08.png" 
                        alt="schedule now servo icon" />
                        {vendorCartItem ? confirmedSchedulingDiv : defaultSchedulingDiv}
                        <button onClick={handleScheduleClick} className={`schedule-button ${(vendorCartItem && !openComponent.pricing) ? '' : 'gray-out'}`}>
                            {cartItemStatus !== 'priced' && vendorCartItem?.status === 'pending' ? 'Edit Booking' : 'Schedule'}
                        </button>
                    </div>
                    <ProviderSummary summaryOpen={openComponent.summary} 
                            cartItem={vendorCartItem} 
                            vendor={vendor} 
                            onContinue={handleAddToCart}
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
            <Modal isOpen={reviewModalOpen} onClose={toggleReviewModal}>
                <ReviewForm vendorName={vendor?.name} vendorId={id} onClose={toggleReviewModal} />
            </Modal>
            {/* <Modal isOpen={reviewShowOpen} onClose={toggleReviewShow}>
                <ReviewShow review={review} author={author} onClose={toggleReviewShow}/>
            </Modal> */}
        </>
    )
}

export default ProviderShow;