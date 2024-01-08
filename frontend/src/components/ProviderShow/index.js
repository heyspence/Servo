import './ProviderShow.css'
import { ReactComponent as StarSvg } from '../../assets/svg/reviewStar.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect, useState } from 'react'
import { isLoggedIn } from '../store/session'
import { fetchServices, fetchVendor } from '../store/vendor'
import { fetchReviews } from '../store/reviews'
import ReviewIndexItem from '../Reviews/ReviewIndexItem'
import PricingCalculator from '../PricingCalculator'
import AppointmentScheduling from '../AppointmentScheduling'
import { fetchImages } from '../store/images'
import Modal from '../Modal'
import ReviewForm from '../Reviews/ReviewForm'
import ReviewShow from '../Reviews/ReviewShow'

const ProviderShow = () => {
    const [seeMoreModalOpen, setSeeMoreModalOpen] = useState(false);
    const { id }= useParams();
    const userLoggedIn = useSelector(isLoggedIn);
    const history = useHistory();
    const dispatch = useDispatch();
    const vendor = useSelector((state)=> state.vendors[id]);
    const reviews = useSelector(state => state?.reviews ? Object.values(state.reviews) : []);
    const images = useSelector(state => state?.images ? Object.values(state.images) : []);
    const defaultService = vendor?.services ? Object.values(vendor.services)[0] : {};
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [reviewShowOpen, setReviewShowOpen] = useState(false);
    const [pricingOpen, setPricingOpen] = useState(false);
    const [schedulingOpen, setSchedulingOpen] = useState(false);
    const [summaryOpen, setSummaryOpen] = useState(false);

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

    const handleScheduleClick = () => {
        setSchedulingOpen(true);
        setPricingOpen(false);
        setSummaryOpen(false);
    }

    const handleGetPriceClick = () => {
        setPricingOpen(true);
        setSchedulingOpen(false);
        setSummaryOpen(false);
    }

    const handleGalleryOpen = () => {
        setPricingOpen(false);
        setSchedulingOpen(false);
        setSummaryOpen(false);
    }

    const handleSummaryOpen = () =>{
        setSummaryOpen(true);
        setPricingOpen(false);
        setSchedulingOpen(false);
    }

    const toggleReviewModal = () => {
        setReviewModalOpen(!reviewModalOpen)
    }

    const toggleReviewShow = () => {
        setReviewShowOpen(!reviewShowOpen)
    }

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
                            <p className="review-tag">{eval(reviewAverage) ? reviewAverage : "-.-"}<StarSvg className="review-star-svg"/>{ reviewCount} ratings</p>
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
                </div>

                <div className="provider-show-right">
                    {/* <div className={`gallery-placeholder ${pricingOpen || schedulingOpen ? '' : 'minimize'}`}> */}
                    {/* <div className="gallery-placeholder"> */}
                        {/* <button className="view-gallery-button" onClick={handleGalleryOpen}>View Gallery</button>
                    </div> */}
                    {/* <div className={`gallery-container ${pricingOpen || schedulingOpen ? 'minimize' : ''}`}> */}
                        <div className="gallery-container">
                        <h3 className="gallery-header">Gallery</h3>
                        <div className="provider-gallery">
                            {images && images.map((image, index) => {
                                return <img className="provider-photo" src={image.url} alt={image.alt} loading={index > 4 ? 'lazy' : undefined} key={image.id} />
                            })}
                        </div>
                    </div>
                    <PricingCalculator basePrice={defaultService?.price} inputs={defaultService?.inputs} service={defaultService} pricingOpen={pricingOpen}/>
                    <AppointmentScheduling schedulingOpen={schedulingOpen}/>
                    <div className={`provider-pricing ${pricingOpen ? 'minimize' : ''}`}>
                        <img className="provider-price-icon" 
                        src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-04.png" 
                        alt="get price icon servo instance price" />
                        <div className="pricing-preview">Starting at: <br/>${defaultService?.price ? defaultService.price : "--"}</div>
                        <button onClick={handleGetPriceClick} className="get-price-button">Get Price</button>
                    </div>
                    <div className={`provider-scheduling ${schedulingOpen ? 'minimize' : ''}`}>
                        <img className="provider-calendar-icon" 
                        src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-08.png" 
                        alt="schedule now servo icon" />
                        <div className="scheduling-preview">Next Available Appointment: <br/>Wed, Dec 24th </div>
                        <button onClick={handleScheduleClick} className="schedule-button">Schedule</button>
                    </div>
                    <div className={`provider-summary ${summaryOpen ? 'minimize' : ''}`}>
                        <img className="provider-summary-icon" 
                        src={"https://spencerheywood.com/images/servo/icons/icons-07.png"} 
                        alt="mobile checkout icon" />
                        <div className="scheduling-preview">Summary</div>
                        <button className="summary-button gray-out">Checkout</button> or
                        <button className="add-to-cart-button gray-out">Add to Cart</button>
                    </div>
                    <div className="disclaimer">
                        Please note that while we strive to connect you with top-quality service providers, 
                        SERVO is a third-party platform. For detailed terms and conditions, 
                        please refer to our Terms of Service. Your privacy is important to us; learn more about how 
                        we handle your information in our Privacy Policy.
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