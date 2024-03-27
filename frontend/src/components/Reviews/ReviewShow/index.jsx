import './ReviewShow.css'
import { ReactComponent as GrayReviewStar } from '../../../assets/svg/grayReviewStar.svg'
import { ReactComponent as CloseIcon } from '../../../assets/svg/Close.svg'
import { closeModal } from '../../store/ui';
import { useDispatch } from 'react-redux';

const ReviewShow = ({props}) => {
    const dispatch = useDispatch()
    const {review, author} = props

    const formatDate = originalDate => {
        const parts = originalDate.split("T")[0].split("-");
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        return formattedDate;
    }

    return (
        <div className='review-show review-form'>
            <CloseIcon className="close-icon" onClick={() => dispatch(closeModal())}/>
            <h1>{author}.</h1>
            <div className="review-stars-container review-show-stars">
                {Array.from({ length: review?.score }, ()=><GrayReviewStar />)}
            </div>
            <p>{formatDate(review.createdAt)}</p>
            <p className="min-chars review-show-body">{review.body}</p>
        </div>
    )
}

export default ReviewShow;