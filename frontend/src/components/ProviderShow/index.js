import './ProviderShow.css'
import { ReactComponent as StarSvg } from '../../assets/svg/reviewStar.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect, useState } from 'react'
import { isLoggedIn } from '../store/session'
import { fetchRestaurants } from '../store/restaurant'
import { fetchReviews } from '../store/reviews'
import ReviewIndexItem from '../Reviews/ReviewIndexItem'

const ProviderShow = () => {
    const category = "Window Cleaning"

    const { id }= useParams()
    const userLoggedIn = useSelector(isLoggedIn)
    const history = useHistory();
    const dispatch = useDispatch();
    const vendor = useSelector((state)=> state.restaurants[id])
    const reviews = useSelector(state => state?.reviews ? Object.values(state.reviews) : [])
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [seeMoreModalOpen, setSeeMoreModalOpen] = useState(false);
    
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

    return (
        <>
            <h1 className="provider-category">Window Cleaning</h1>
            <div className="provider-show">
                <div className="provider-show-left">
                    <div className="meta-info-container">
                        <h2 className="provider-name">{vendor?.name}</h2>
                        <p className="review-tag">{(total/reviewCount).toFixed(1)}<StarSvg className="review-star-svg"/>{ reviewCount} ratings</p>
                    </div>
                    <div className="location-details-container">
                        <p>(971) 777-1485</p>
                        <p style={{margin: "10px 0"}}>support@easewindows.com</p>
                        <p>{vendor?.address}</p>
                    </div>
                    <div className="promotions">
                        <h3 className="promotions-header">Promotions</h3>
                        <div className="promotion">Save $5 on $100 or more</div>
                        <div className="promotion">15% Off 4/year service</div>
                        <div className="promotion">10% Off 2/Year Service</div>
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

                </div>
            </div>
        </>
    )
}

export default ProviderShow;