import { useEffect, useState } from 'react'
import './ReviewIndexItem.css'
import ReviewShow from '../ReviewShow';
import { ReactComponent as GrayReviewStar } from '../../../assets/svg/grayReviewStar.svg'
import Modal from '../../Modal'

const ReviewIndexItem = ({review}) => {

    const [author, setAuthor] = useState();
    const [reviewModalisOpen, setReviewModalisOpen] = useState();

    const toggleReviewModal = () => {
        setReviewModalisOpen(!reviewModalisOpen)
    }

    useEffect(()=>{
        if(review?.userId){
            fetchAuthor(review.userId);
        }
    },[review])

    const fetchAuthor = async authorId => {
        const res = await fetch(`/api/users/${authorId}`)
        if(res.ok){
            const { user } = await res.json();
            setAuthor(user.firstName + " " + user.lastName[0].toUpperCase())
        }
    }

    const getColor = () => {
        const letters = "abcdefghijklmnopqrstuvwxyz"
        const pos = letters.indexOf(author ? author[0].toLowerCase() : 'a')

        if(pos < 3)return 'rgb(0, 131, 138)'
        else if(pos >=3 && pos < 7) return 'rgb(0, 131, 138)'
        else if(pos >=7 && pos < 11) return 'rgb(91, 193, 196)'
        else if(pos >=11 && pos <17) return 'rgb(235 22 0)'
        else if(pos >= 17 && pos <21) return '#f9e7f7'
        else return '#39ced7'
    }

    const randomColor = getColor()

    return (
        <>
            <li className="review-index-item" onClick={toggleReviewModal}>
                <div className="review-title-container">
                    <div className="name-circle" style={{ backgroundColor: randomColor }}>{ author ? author[0] : ''}</div>
                    <h3>{author}</h3>
                    <div className="review-stars-container">
                        {Array.from({ length: review?.score }, (_, index)=><GrayReviewStar key={index} />)}
                    </div>
                </div>
                <p className="review-index-item-body">{review?.body}</p>
            </li>
            <Modal isOpen={reviewModalisOpen} onClose={toggleReviewModal}>
                <ReviewShow review={review} author={author} onClose={toggleReviewModal}/>
            </Modal>
        </>
    )
}

export default ReviewIndexItem