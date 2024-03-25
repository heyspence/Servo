import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Orders.css'
import { fetchOrders, getPastVendorIds } from '../store/orders';
import OrderIndexItem from './OrderIndexItem';
import { isLoggedIn } from '../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchVendors, getPastVendors} from '../store/vendor';
import VendorIndexItem from '../Vendor/VendorIndexItem';
import { useState } from 'react';
import ReminderForm from '../Reminders/ReminderForm';

const Orders = () => {
    const userId = useSelector(state => state?.session? state.session.user?.id : null)
    const orders = useSelector(state => state?.orders ? Object.values(state.orders) : [])
    const userLoggedIn = useSelector(isLoggedIn)
    const history = useHistory();
    const dispatch = useDispatch();
    const pastVendorIds = useSelector(getPastVendorIds)
    const vendors = useSelector(state => state?.vendors)
    const [showDropdown, setShowDropdown] = useState(false);
    const [reminderFrequency, setReminderFrequency] = useState('');
    
    const getPastVendors = (pastVendorIds = []) => {
        const pastVendors = [];
        Object.values(vendors).forEach((vendor) => {
            if (pastVendorIds.includes(vendor.id)) {
                pastVendors.push(vendor);
            }
        });
        return pastVendors;
    }
    
    useEffect(()=>{
        if(!userLoggedIn){
            history.push('/home')
        }else{
            dispatch(fetchOrders(userId))
            dispatch(fetchVendors())
    
        }
    },[userId, dispatch, userLoggedIn, history])
    
    const pastVendors = getPastVendors(pastVendorIds)

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
                        return (
                            <>
                                <VendorIndexItem key={vendor.id} name={vendor.name} 
                                imageUrl={vendor.thumbnailImageUrl} 
                                logoImageUrl={vendor.logoImageUrl}
                                id={vendor.id} 
                                />
                                <button onClick={() => setShowDropdown(!showDropdown)}>Create Reminder</button>
                    {showDropdown && (
                        <ReminderForm vendorId={vendor.id} userId={userId}/>
                    )}
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Orders;