import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Orders.css'
import { fetchOrders } from '../store/orders';
import OrderIndexItem from './OrderIndexItem';
import { isLoggedIn } from '../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Orders = () => {
    const userId = useSelector(state => state?.session? state.session.user?.id : null)
    const orders = useSelector(state => state?.orders ? Object.values(state.orders) : [])
    const userLoggedIn = useSelector(isLoggedIn)
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!userLoggedIn){
            history.push('/home')
        }else{
            dispatch(fetchOrders(userId))
        }
    },[userId, dispatch, userLoggedIn, history])

    return (
        <div className="orders">
            <div className="orders-main-container">
                <div className="orders-index">
                    <h1>Service History</h1>
                    { orders && orders.reverse().map(order => {
                        return <OrderIndexItem key={order.id} order={order}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Orders;