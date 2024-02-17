import { useDispatch, useSelector } from "react-redux";
import './ProviderReviews.css'
import ReviewIndexItem from "../../Reviews/ReviewIndexItem";
import { useEffect } from "react";
import { fetchReviews } from "../../store/reviews";

const ProviderReviews = ({toggleReviewModal, id}) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state?.reviews ? Object.values(state.reviews) : []);

    useEffect(()=>{
        dispatch(fetchReviews(id));
    }, [dispatch, id])

    return (
        <div className="reviews">
            <h3 className="reviews-header">Reviews</h3>
            <button className="vendor-review-button" onClick={toggleReviewModal}>Add a Review</button>
            <ul className="provider-review-index">
                { reviews && reviews.reverse().map(review => {
                    return <ReviewIndexItem review={review} key={review?.id}/>
                })}
            </ul>
        </div>
    )
}

export default ProviderReviews;