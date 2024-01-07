import { useSelector } from "react-redux";
import ReviewIndexItem from "../ReviewIndexItem";
import './ReviewIndex.css'

const ReviewIndex = ({onClick}) => {
    const reviews = useSelector(state => state?.reviews ? Object.values(state.reviews) : []);

    return (
        <ul className="review-index">
            { reviews && reviews.reverse().map(review => {
                return <ReviewIndexItem review={review} key={review?.id} onClick={onClick}/>
            })}
        </ul>
    )
}

export default ReviewIndex;