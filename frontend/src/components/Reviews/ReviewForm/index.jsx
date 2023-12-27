import { useDispatch, useSelector } from 'react-redux';
import './ReviewForm.css'
import { useState } from 'react';
import { createReview } from '../../store/reviews';
import { ReactComponent as CloseIcon } from '../../../assets/svg/Close.svg'

const ReviewForm = ({ restaurantName, restaurantId, onClose }) => {
    const user = useSelector(state => state.session?.user)
    const dispatch = useDispatch();
    const [reviewBody, setReviewBody] = useState('');
    const [score, setScore] = useState(undefined);

    const handleInputChange = e => {
        setReviewBody(e.target.value)
    }

    const handleScoreChange = e => {
        setScore(e.target.value)
    }

    const submitReviewForm = (e) => {
        e.preventDefault();
        let review = {
            review: {
                userId: user.id,
                body: reviewBody,
                score 
            }
        }
        if(reviewBody.length > 10 && score !== undefined){
            dispatch(createReview(restaurantId, review)).then(()=>{onClose();})
        }
    }

    return (
        <div className="review-form">
            <CloseIcon className="close-icon" onClick={onClose}/>
            <h2>Add a Public Review</h2>
            <h3>{ restaurantName }</h3>
            <form>
                <div className="review-form-header">
                    <p className="form-user">{ user?.firstName } { user?.lastName[0]?.toUpperCase()}.</p>
                    <p className="public-review-tag">Public Review </p>
                </div>
                <select onChange={handleScoreChange}>
                    <option>Select One</option>
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={5}>5 Stars</option>
                </select>
                <textarea className="review-body"
                    value={reviewBody} 
                    onChange={handleInputChange} 
                    placeholder="Helpful reviews mention specific items and describe their quality and taste">
                </textarea>
            </form>
            <p className="min-chars">Min characters: 10</p>
            <div className="review-form-footer">
                <button onClick={submitReviewForm}>Submit</button>
            </div>
        </div>
    )
}

export default ReviewForm;