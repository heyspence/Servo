import { useDispatch, useSelector } from 'react-redux';
import './OrderIndexItem.css'
import { fetchRestaurant } from '../../store/restaurant';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ReactComponent as ArrowSvg } from '../../../assets/svg/Arrow.svg'

const OrderIndexItem = ({ order }) =>{
    const restaurantId = order.restaurantId;
    const dispatch = useDispatch();
    const history = useHistory();
    const restaurant = useSelector(state => state?.restaurants ? state.restaurants[restaurantId] : null);
    const formattedPrice = (order.total).toFixed(2)

    const formatDate = data => {
        const options = {  weekday: 'short', month: 'short', day: 'numeric' };
        const date = new Date(data);
        return date.toLocaleDateString('en-US', options);
    }

    const formattedDate = formatDate(order.createdAt);
    useEffect(()=>{
        if(!restaurant){
            dispatch(fetchRestaurant(restaurantId))
        }
    },[dispatch, restaurantId, restaurant])

    const handleRestaurantClick = () => {
        history.push(`/restaurants/${restaurant.id}`)
    }

    return (
        <div className="order-index-item">
            <div className="order-index-item-header">
                <h3 onClick={handleRestaurantClick}>{restaurant?.name}</h3>
                <ArrowSvg id="arrow-svg"/>
            </div>
            <div className="order-index-item-body">
                    <p>#{order?.id}</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p>{formattedDate}</p>
                    <p>&nbsp;•&nbsp;</p>
                    <p>${formattedPrice}</p>
            </div>
        </div>
    )
}

export default OrderIndexItem;