import { useDispatch, useSelector } from 'react-redux';
import './OrderIndexItem.css'
import { fetchVendor } from '../../store/vendor';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ReactComponent as ArrowSvg } from '../../../assets/svg/Arrow.svg'

const OrderIndexItem = ({ order, expanded, onToggle }) =>{
    const vendorId = order.vendorId;
    const dispatch = useDispatch();
    const history = useHistory();
    const vendor = useSelector(state => state?.vendors ? state.vendors[vendorId] : null);
    const formattedPrice = (order.price).toFixed(2)

    const formatDate = data => {
        const options = {  weekday: 'short', month: 'short', day: 'numeric' };
        const date = new Date(data);
        return date.toLocaleDateString('en-US', options);
    }

    const formattedDate = formatDate(order.updatedAt);
    useEffect(()=>{
        if(!vendor){
            dispatch(fetchVendor(vendorId))
        }
    },[dispatch, vendorId, vendor])

    const handleVendorClick = () => {
        history.push(`/vendors/${vendor.id}`)
    }

    return (
        <div>
            {!expanded ? 
            <div className="order-index-item">
                <div className="order-index-item-header" onClick={onToggle}>
                    <h3>{vendor?.name}</h3>
                    <ArrowSvg id="arrow-svg" className={expanded ? 'expanded' : ''}/>
                </div>
                    <div className="order-index-item-body">
                        <div className="vendor-index-item-meta-info-container">
                            <img className='vendor-logo-orders' src={`${vendor?.logoImageUrl}`} alt="Vendor Logo"></img>
                        </div>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <p>{formattedDate}</p>
                        <p>&nbsp;•&nbsp;</p>
                        <p>${formattedPrice}</p>
                        <p className='order-status'>Order Status: Unfulfilled</p>
                    </div>
            </div> :
            <div className="order-index-item-expanded">
            <div className="order-index-item-header" onClick={onToggle}>
                <h3 onClick={handleVendorClick}>{vendor?.name}</h3>
                <ArrowSvg id="rotated-arrow-svg" className={expanded ? 'expanded' : ''} />
            </div>
            <div className="order-index-item-body-expanded">
                <div className="order-info-top"> 
                    <div className='date-price-order-div'> 
                            <p>{formattedDate}</p>
                            <p>${formattedPrice}</p>
                        </div>
                        <div className="vendor-index-item-meta-info-container">
                            <img className='vendor-logo-orders vendor-logo-orders-expanded' src={`${vendor?.logoImageUrl}`} alt="Vendor Logo" />
                        </div>
                </div>
                <div className="order-info-bottom">
                    <button className='book-again-button' onClick={handleVendorClick}>Book Again</button>
                    <p className='order-status'>Order Status: Unfulfilled</p>
                </div>
            </div>
        </div>}
        </div>
    )
}

export default OrderIndexItem;