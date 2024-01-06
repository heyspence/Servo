import './Checkout.css'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { isLoggedIn } from '../store/session';
import { useEffect } from 'react';
import { deleteCartItems, getCart } from '../store/cart';
import { findVendorByService } from '../store/vendor';
import CartItem from '../Cart/CartItem';
import { ReactComponent as MasterCardIcon } from '../../assets/svg/MasterCard.svg';
import { createOrder } from '../store/orders';

const Checkout = () => {
    const cartItems = useSelector(state => state.cart?.cartItems ? Object.values(state.cart.cartItems) : [])
    const currentUserId = useSelector(state => state.session.user?.id)
    const cartVendor = useSelector(state => findVendorByService(state, cartItems[0]?.menuItemId))
    const isCartOpen = useSelector(state => state.cart?.isCartOpen)
    const user = useSelector(state => state?.session ? state.session.user : null)
    const userLoggedIn = useSelector(isLoggedIn);
    const dispatch = useDispatch();
    const history = useHistory();

    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.price
    }, 0).toFixed(2)

    useEffect(()=>{
        dispatch(getCart(currentUserId))
    },[isCartOpen, currentUserId, dispatch])

    if(!userLoggedIn){history.push('/home');}

    const handleVendorClick = () => {
        history.push(`/vendors/${cartVendor.id}`)
    }

    const handlePlaceOrder = () => {
        const order = { order:{
            userId: user.id,
            vendorId: cartVendor.id,
            total: totalPrice
        }}
        dispatch(createOrder(order)).then(()=>{
            dispatch(deleteCartItems(user.id))
            history.push(`/orders`)
        })
    }

    if(!user || cartItems.length === 0) history.push('/home')
    return (
        <div className="checkout">
            <div className="checkout-info-container">
                <div className="checkout-account-details">
                    <h3>1. Account Details</h3>
                    <p>{user?.email}</p>
                </div>

                <div className="checkout-shipping-details">
                    <h3>2. Shipping Details</h3>
                    <div className="checkout-user-info">
                        <h3>Home</h3>
                        <p>1600 Pennsylvania Avenue NW, Washington, DC 20500</p>
                        <h3>Instruction</h3>
                        <p>Leave it at my door</p>
                        <h3>Phone Number</h3>
                        <p>{user?.phoneNumber}</p>
                    </div>
                </div>

                <div className="checkout-payment-details checkout-account-details">
                    <h3>3. Payment Details</h3>
                    <p><MasterCardIcon style={{margin: '0 8px -6px 0'}}/>...1234</p>
                </div>

                <div className="checkout-cart-details">
                    <div className="checkout-cart">
                        <div className="cart-header">
                        <p>Your cart from</p>
                        <h3 onClick={handleVendorClick}>
                            {cartVendor?.name}
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M5.79289 12.7071C5.40237 12.3166 5.40237 11.6834 5.79289 11.2929L9.08579 8L5.79289 4.70711C5.40237 4.31658 5.40237 3.68342 5.79289 3.29289C6.18342 2.90237 6.81658 2.90237 7.20711 3.29289L11.2071 7.29289C11.3946 7.48043 11.5 7.73478 11.5 8C11.5 8.26521 11.3946 8.51957 11.2071 8.70711L7.20711 12.7071C6.81658 13.0976 6.18342 13.0976 5.79289 12.7071Z" fill="#191919"></path></svg>
                        </h3>
                        </div>
                        <ul className="cart-list">
                            {cartItems && cartItems.map((cartItem)=>{
                                    return <CartItem key={cartItem.id} cartItem={cartItem} />
                            })}
                        </ul>
                        <button className="checkout-button" onClick={handlePlaceOrder}>
                                <p>Place Order </p>
                                <p>${totalPrice}</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;