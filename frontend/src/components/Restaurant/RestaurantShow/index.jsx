import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './RestaurantShow.css'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedIn } from '../../store/session'
import MenuItemIndex from '../../MenuItem/MenuItemIndex'
import { fetchRestaurants } from '../../store/restaurant';
import { useEffect, useState } from 'react'
import { fetchReviews } from '../../store/reviews'
import { ReactComponent as StarSvg } from '../../../assets/svg/reviewStar.svg'
import Modal from '../../Modal'
import ReviewForm from '../../Reviews/ReviewForm'
import ReviewIndex from '../../Reviews/ReviewIndex'
import SeeMoreModal from '../SeeMoreModal'

const RestaurantShow = () => {
    const { id }= useParams()
    const userLoggedIn = useSelector(isLoggedIn)
    const history = useHistory();
    const dispatch = useDispatch();
    const restaurant = useSelector((state)=> state.restaurants[id])
    const reviews = useSelector(state => state?.reviews ? Object.values(state.reviews) : [])
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [seeMoreModalOpen, setSeeMoreModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchRestaurants());
        dispatch(fetchReviews(id));
    },[dispatch, id])

    const toggleReviewModal = () => {
        setReviewModalOpen(!reviewModalOpen)
    }

    const toggleSeeMoreModal = () => {
        setSeeMoreModalOpen(!seeMoreModalOpen)
    }

    let reviewCount = 0
    let total = 0

    reviews.forEach(review => {
        reviewCount++
        total += review.score
    })
    
    if(!userLoggedIn) history.push('/')

    return (
        <div className="restaurant-show">
            <div className="image-placeholder" >
                <img src={restaurant?.imageUrl} className="image-placeholder" alt="restaurant banner"/>
                <img src={restaurant?.iconImageUrl} className="restaurant-logo white-background" alt="restaurant icon" />
            </div>
            <h1>{restaurant?.name}</h1>
            <div className="store-info-container">
                <p className="restaurant-show-reviews">{(total/reviewCount).toFixed(1)}<StarSvg className="review-star-svg"/>{ reviewCount} ratings • $</p>
                <button className="see-more-button" onClick={toggleSeeMoreModal}>See More</button>
            </div>

            <Modal isOpen={reviewModalOpen} onClose={toggleReviewModal}>
                <ReviewForm restaurantName={restaurant?.name} restaurantId={id} onClose={toggleReviewModal} />
            </Modal>
            <Modal isOpen={seeMoreModalOpen} onClose={toggleSeeMoreModal}>
                <SeeMoreModal restaurant={restaurant} onClose={toggleSeeMoreModal} />
            </Modal>

            <div className="menu-item-index-container">
                <MenuItemIndex />
            </div>
            <div className="reviews-container">
                <button className="review-button" onClick={toggleReviewModal}>Add a Review</button>
                <ReviewIndex />
            </div>
        </div>
    )
}

export default RestaurantShow