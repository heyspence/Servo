import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Orders.css'
import { fetchOrders, getPastVendorIds } from '../store/orders';
import OrderIndexItem from './OrderIndexItem';
import { isLoggedIn } from '../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchVendors, getPastVendors} from '../store/vendor';
import VendorIndexItem from '../Vendor/VendorIndexItem';

const Orders = () => {
    const userId = useSelector(state => state?.session? state.session.user?.id : null)
    const orders = useSelector(state => state?.orders ? Object.values(state.orders) : [])
    const userLoggedIn = useSelector(isLoggedIn)
    const history = useHistory();
    const dispatch = useDispatch();
    const pastVendorIds = useSelector(getPastVendorIds)
    const vendors = useSelector(state => state?.vendors)
    
    const getPastVendors = (pastVendorIds = []) => {
        const pastVendors = [];
        Object.values(vendors).forEach((vendor) => {
            if (pastVendorIds.includes(vendor.id)) {
                pastVendors.push(vendor);
            }
        });
        return pastVendors;
    }
    
    const pastVendors = getPastVendors(pastVendorIds)

    
    useEffect(()=>{
        if(!userLoggedIn){
            history.push('/home')
        }else{
            dispatch(fetchOrders(userId))
            dispatch(fetchVendors())
            // dispatch(fetchVendors())
        }
    },[userId, dispatch, userLoggedIn, history, pastVendorIds])

    return (
        <div className="orders">
            <div className="orders-main-container">
                <div className="orders-index">
                    <h1>Service History</h1>
                    { orders && orders.reverse().map(order => {
                        return <OrderIndexItem key={order.id} order={order}/>
                    })}
                </div>
                <div> Past Vendors 
                { pastVendors && pastVendors.map(vendor => {
                        return <VendorIndexItem key={vendor.id} name={vendor.name} 
                        imageUrl={vendor.thumbnailImageUrl} 
                        logoImageUrl={vendor.logoImageUrl}
                        id={vendor.id} 
                        />
                    })}
                </div>



            </div>
        </div>
    )
}

export default Orders;