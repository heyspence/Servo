import './ProviderShow.css'
import { ReactComponent as StarSvg } from '../../assets/svg/reviewStar.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect, useState } from 'react'
import { isLoggedIn } from '../store/session'
import { fetchRestaurants } from '../store/restaurant'
import { fetchReviews } from '../store/reviews'
import ReviewIndexItem from '../Reviews/ReviewIndexItem'
import PricingCalculator from '../PricingCalculator'
import AppointmentScheduling from '../AppointmentScheduling'

const ProviderShow = () => {
    const { id }= useParams();
    const userLoggedIn = useSelector(isLoggedIn);
    const history = useHistory();
    const dispatch = useDispatch();
    const vendor = useSelector((state)=> state.restaurants[id]);
    const reviews = useSelector(state => state?.reviews ? Object.values(state.reviews) : []);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [seeMoreModalOpen, setSeeMoreModalOpen] = useState(false);
    const [pricingOpen, setPricingOpen] = useState(false);
    const [schedulingOpen, setSchedulingOpen] = useState(false);
    const window_cleaning = "Window Cleaning";
    const house_cleaning = "House Cleaning";
    const pest_control = "Pest Control";
    const carpet_cleaning = "Carpet Cleaning";
    const garbage_can_cleaning = "Garbage Can Cleaning"
    const car_detailing = "Auto Detailing"
    const phoneNumber = vendor?.phoneNumber
    const formattedPhoneNumber = "(" + phoneNumber?.slice(0, 3) + ") " + phoneNumber?.slice(3, 6) + "-" + phoneNumber?.slice(6, 10)


    const photoUrls = [ 
        "https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-12.jpg", 
        "https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-13.jpg", 
        "https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-14.jpg",  
        "https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-11.jpg", 
        "https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-12.jpg",  
        "https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-18.jpg", 
        "https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-25.jpg", 
        "https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-26.jpg",  
        "https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-28.jpg", 
        "https://spencerheywood.com/images/servo/Pictures/lily_maid_cleaning_cropped/Lily%20Maid%20Cleaning%20Shoot-29.jpg"]

    if(!userLoggedIn) history.push('/')

    useEffect(() => {
        dispatch(fetchRestaurants());
        dispatch(fetchReviews(id));
    },[dispatch, id])

    let reviewCount = 0
    let total = 0

    reviews.forEach(review => {
        reviewCount++
        total += review.score
    })

    const handleScheduleClick = () => {
        setSchedulingOpen(true);
        setPricingOpen(false);
    }

    const handleGetPriceClick = () => {
        setPricingOpen(true);
        setSchedulingOpen(false);
    }

    const handleGalleryOpen = () => {
        setPricingOpen(false);
        setSchedulingOpen(false);
    }

    return (
        <>
            {/* <h1 className="provider-category">{eval(vendor?.category)}</h1> */}
            <div className="provider-show">
                <div className="provider-show-left">
                    <div className="meta-info-block">
                        <div className="vendor-logo-background">
                            <img className="vendor-logo" src={vendor?.iconImageUrl} />
                        </div>
                        <div className="meta-info-container">
                            <h2 className="provider-name">{vendor?.name}</h2>
                            <p className="review-tag">{(total/reviewCount).toFixed(1)}<StarSvg className="review-star-svg"/>{ reviewCount} ratings</p>
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
                        <div className="provider-review-index">
                            {reviews && reviews.map(review => {
                                return <ReviewIndexItem review={review}/>
                            })}
                        </div>
                    </div>
                </div>

                <div className="provider-show-right">
                    <div onClick={handleGalleryOpen} className={`gallery-placeholder ${pricingOpen || schedulingOpen ? '' : 'minimize'}`}>
                        <button className="view-gallery-button">View Gallery</button>
                    </div>
                    <PricingCalculator pricingOpen={pricingOpen}/>
                    <AppointmentScheduling schedulingOpen={schedulingOpen}/>
                    <div className={`gallery-container ${pricingOpen || schedulingOpen ? 'minimize' : ''}`}>
                        <h3 className="gallery-header">Gallery</h3>
                        <div className="provider-gallery">
                            {photoUrls && photoUrls.map(photo => {
                                return <img className="provider-photo" src={photo} alt={vendor?.name} />
                            })}
                        </div>
                    </div>
                    <div className={`provider-pricing ${pricingOpen ? 'minimize' : ''}`}>
                        <img className="provider-price-icon" src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-04.png" alt="get price icon servo instance price" />
                        <div className="pricing-preview">Starting at: <br/>$25</div>
                        <button onClick={handleGetPriceClick} className="get-price-button">Get Price</button>
                    </div>
                    <div className={`provider-scheduling ${schedulingOpen ? 'minimize' : ''}`}>
                        <img className="provider-calendar-icon" src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-08.png" alt="schedule now servo icon" />
                        <div className="scheduling-preview">Next Available Appointment: <br/>Wed, Dec 24th </div>
                        <button onClick={handleScheduleClick} className="schedule-button">Schedule</button>
                    </div>
                    <div className="disclaimer">
                        Please note that while we strive to connect you with top-quality service providers, 
                        SERVO is a third-party platform. For detailed terms and conditions, 
                        please refer to our Terms of Service. Your privacy is important to us; learn more about how 
                        we handle your information in our Privacy Policy.
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProviderShow;