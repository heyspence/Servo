import { useDispatch, useSelector } from 'react-redux';
import './Home.css'
import { isLoggedIn } from '../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import VendorIndex from '../Vendor/VendorIndex';
import { getCart } from '../store/cart.js'
import { useEffect } from 'react';

const Home = () => {
    const userLoggedIn = useSelector(isLoggedIn);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user ? state.session.user.id : null)
    const history = useHistory();

    if(!userLoggedIn){
        history.push('/')
    }

    useEffect(()=>{
        dispatch(getCart(userId))
    }, [dispatch])

   return(
        <div className="home-main">
            <VendorIndex category={"house_cleaning"}/>
            <VendorIndex category={"pest_control"}/>
            <VendorIndex category={"carpet_cleaning"}/>
            <VendorIndex category={"garbage_can_cleaning"}/>
            <VendorIndex category={"window_cleaning"}/>
        </div>
   )
}

export default Home;