import { useDispatch, useSelector } from 'react-redux';
import './ReviewForm.css'
import { useState } from 'react';
import { createReview } from '../../store/reviews';
import { ReactComponent as CloseIcon } from '../../../assets/svg/Close.svg'
import { closeModal } from '../../store/ui';

const ReviewForm = ({ props }) => {
    const {vendorId} = props
    console.log('🦋🦋🦋 ~ vendorId:', vendorId);
    const vendorName = useSelector(state => state.vendors[vendorId].name)
    console.log('🦋🦋🦋 ~ vendorName:', vendorName);
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
            dispatch(createReview(vendorId, review)).then(()=>{dispatch(closeModal())})
        }
    }

    return (
        <div className="review-form">
            <CloseIcon className="close-icon" onClick={() => dispatch(closeModal())}/>
            <h2>Add a Public Review</h2>
            <h3>{ vendorName }</h3>
            <form>
                <div className="review-form-header">
                    <p className="form-user">{ user?.firstName } { user?.lastName[0]?.toUpperCase()}.</p>
                    <p className="public-review-tag">Public Review </p>
                </div>
                <select onChange={handleScoreChange}>
                    <option>Select One</option>
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                </select>
                <textarea className="review-body"
                    value={reviewBody} 
                    onChange={handleInputChange} 
                    placeholder="Your review here">
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