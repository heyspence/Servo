import './VendorIndexItem.css'
import { useHistory } from 'react-router-dom'
import { ReactComponent as StarSvg } from '../../../assets/svg/reviewStar.svg'
import { useEffect, useState } from 'react';
import csrfFetch from '../../store/csrf';

const VendorIndexItem = ({ id, name, imageUrl = '', logoImageUrl = '' }) => {
    const history = useHistory();
    const [reviews, setReviews] = useState([]);

    const vendorRedirect = (e) => {
        e.stopPropagation();
        window.scrollTo({
            top: 0
        })
        history.push(`/vendors/${id}`)
    }

    const fetchVendorReviews = async id => {
        const res = await csrfFetch(`/api/vendors/${id}/reviews`);
        if(res.ok){
            const data = await res.json();
            setReviews(Object.values(data.reviews))
        }else{
            setReviews([])
        }
    }

    useEffect(()=>{
        fetchVendorReviews(id)
    }, [id])

    let reviewCount = reviews.length
    let total = reviews.reduce((acc, review) => acc + review.score, 0)
    let average = reviewCount > 0 ? (total / reviewCount).toFixed(1) : '--.--'

    return(
        <li className="vendor-index-item" onClick={vendorRedirect}>
            <div className="vendor-index-image-container">
                <img src={imageUrl} alt={`${name} vendor cover image`}/>
            </div>
            <div className="vendor-index-item-meta-info-container">
                <img src={logoImageUrl} alt={`${name} logo`}/>
                <div className="vendor-index-item-meta-info">
                    <h3>{name}</h3>
                    <span className="macro-review-container">
                        <p>{average}</p>
                        <StarSvg className="review-star-svg" />
                        <p>({reviewCount})</p>
                    </span>
                </div>
            </div>
        </li>
    )
}

export default VendorIndexItem