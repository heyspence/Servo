import './Cart.css'
import { ReactComponent as CloseIcon } from '../../assets/svg/Close.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { assignCart, getCart, toggleCart } from '../store/cart'
import CartItem from './CartItem'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { findRestaurantByMenuItem } from '../store/restaurant'

const Cart = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const cartItems = useSelector(state => state.cart?.cartItems ? Object.values(state.cart.cartItems) : [])
    const currentUserId = useSelector(state => state.session.user?.id)
    const cartRestaurant = useSelector(state => findRestaurantByMenuItem(state, cartItems[0]?.menuItemId))
    const isCartOpen = useSelector(state => state.cart?.isCartOpen)

    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.price
    }, 0).toFixed(2)

    useEffect(()=>{
        if(isCartOpen){
            dispatch(getCart(currentUserId))
        }
    },[isCartOpen, currentUserId, dispatch])

    useEffect(()=>{
        dispatch(assignCart(cartRestaurant))
    },[cartRestaurant])


    const handleCartClick = (e) => {
        e.stopPropagation();
    }

    const handleRestaurantClick = () => {
        closeCart()
        history.push(`/restaurants/${cartRestaurant.id}`)
    }

    const closeCart = () => {
        dispatch(toggleCart())
    }

    const handleCheckout = () => {
        closeCart()
        history.push(`/checkout`)
    }
    
    if(!isCartOpen) return null;

    const cartContent = cartItems.length > 0 ? (
        <>
            <div className="cart-header">
                <p>Your cart from</p>
                <h3 onClick={handleRestaurantClick}>
                    {cartRestaurant?.name}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M5.79289 12.7071C5.40237 12.3166 5.40237 11.6834 5.79289 11.2929L9.08579 8L5.79289 4.70711C5.40237 4.31658 5.40237 3.68342 5.79289 3.29289C6.18342 2.90237 6.81658 2.90237 7.20711 3.29289L11.2071 7.29289C11.3946 7.48043 11.5 7.73478 11.5 8C11.5 8.26521 11.3946 8.51957 11.2071 8.70711L7.20711 12.7071C6.81658 13.0976 6.18342 13.0976 5.79289 12.7071Z" fill="#191919"></path></svg>
                </h3>
                <button className="checkout-button" onClick={handleCheckout}>
                    <p>Checkout </p>
                    <p>${totalPrice}</p>
                </button>
            </div>
            <ul className="cart-list">
                {cartItems && cartItems.map((cartItem)=>{
                        return <CartItem key={cartItem.id} cartItem={cartItem} />
                })}
            </ul>
        </>
    ) : (
        <>
            <div className="cart-header empty-cart">
                <h3>Empty Cart</h3>
                <p>Build and save carts from multiple stores</p>
                <p>Add items to get started</p>
            </div>
        </>
    )

    return(
        <div className="cart-backdrop" onClick={closeCart}>
            <div className="cart-main" onClick={handleCartClick}>
                <div className="cart-close">
                    <CloseIcon onClick={closeCart} />
                </div>
                {cartContent}
            </div>
        </div>
    )
}


export default Cart;