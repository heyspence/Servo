import { useDispatch, useSelector } from 'react-redux';
import './Home.css'
import { isLoggedIn } from '../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import VendorIndex from '../Vendor/VendorIndex';
import { getBookings } from '../store/bookings.js'
import { useEffect } from 'react';
import { fetchVendors } from '../store/vendor.js';

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userLoggedIn = useSelector(isLoggedIn);
    const {currentUser, homeView} = useSelector(state => {
        return({
            currentUser: state.session.user ? state.session.user : null,
            homeView: state.ui?.homeView
        })
    })
    const userId = currentUser?.id

    if(!userLoggedIn){
        history.push('/')
    }

    // if (homeView === 'vendor') history.push(destination);

    //     useEffect(()=>{ // When the user's login status or home view changes, it redirects them to the appropriate page.
    //     // let destination = user?.vendorId ? `/vendors/${user.vendorId}/dashboard` : '/home'
    //     const destination = homeView === "vendor" ? `/vendors/${user.vendorId}/dashboard` : '/home'
    //     if(userLoggedIn) history.push(destination);
    // },[user, userLoggedIn, homeView, history])

    useEffect(()=>{
        dispatch(getBookings(userId))
        dispatch(fetchVendors())
    }, [dispatch, userId])


   return(
        <div className="home-main">
            <VendorIndex category={"house_cleaning"}/>
            <VendorIndex category={"pest_control"}/>
            <VendorIndex category={"garbage_can_cleaning"}/>
            <VendorIndex category={"window_cleaning"}/>
        </div>
   )
}

export default Home;