import { useDispatch, useSelector } from 'react-redux';
import './Home.css'
import { getActiveAddress, isLoggedIn } from '../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import VendorIndex from '../Vendor/VendorIndex';
import { getCart } from '../store/cart.js'
import { useEffect } from 'react';
import { fetchVendors } from '../store/vendor.js';
import AddressForm from './AddressForm/AddressForm.js';

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userLoggedIn = useSelector(isLoggedIn);
    const {currentUser, currentAddress} = useSelector(state => {
        return({
            currentUser: state.session.user ? state.session.user : null,
            currentAddress: getActiveAddress(state)
        })
    })
    const userId = currentUser?.id

    const addressForm = () => {
        if(!currentAddress){
            return <AddressForm currentUser={currentUser} />
        }
    }

    if(!userLoggedIn){
        history.push('/')
    }

    useEffect(()=>{
        dispatch(getCart(userId))
        dispatch(fetchVendors())
    }, [dispatch, userId])


   return(
        <div className="home-main">
            {addressForm()}
            <VendorIndex category={"house_cleaning"}/>
            <VendorIndex category={"pest_control"}/>
            <VendorIndex category={"carpet_cleaning"}/>
            <VendorIndex category={"garbage_can_cleaning"}/>
            <VendorIndex category={"window_cleaning"}/>
        </div>
   )
}

export default Home;