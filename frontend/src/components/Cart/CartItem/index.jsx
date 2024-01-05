import { useEffect } from 'react';
import { removeFromCart } from '../../store/cart'
import './CartItem.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMenuItem } from '../../store/menuItems';

const CartItem = ({ cartItem }) => {
    console.log(cartItem.name)
    const { serviceId, id, price } = cartItem;
    const menuItem = useSelector(state => state?.menuItems[1]);
    const dispatch = useDispatch();
    // const price = menuItem?.price.toFixed(2)
    const name = cartItem?.name

    // useEffect(()=>{
    //     if(menuItemId) dispatch(fetchMenuItem(menuItemId))
    // },[dispatch])

    return (
        <div className="cart-item">
            <li>
                <img src={menuItem?.imageUrl} className="cart-item-image" alt=""/>
                <div className="cart-item-info">
                    <p className="cart-item-name">{name}</p>
                    <p className="cart-item-price">${price.toFixed(2)}</p>
                </div>
                <button className="cart-item-remove-button" onClick={()=> dispatch(removeFromCart(id)) }>
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5.5 2C5.5 1.44772 5.94772 1 6.5 1H9.5C10.0523 1 10.5 1.44772 10.5 2V3H13.5C14.0523 3 14.5 3.44772 14.5 4C14.5 4.55228 14.0523 5 13.5 5H2.5C1.94772 5 1.5 4.55228 1.5 4C1.5 3.44772 1.94772 3 2.5 3H5.5V2Z" fill="currentColor"></path><path d="M13.2346 6.5H2.7655L3.51227 13.2209C3.62481 14.2337 4.48093 15 5.50003 15H10.5C11.5191 15 12.3753 14.2337 12.4878 13.2209L13.2346 6.5Z" fill="currentColor"></path></svg>
                </button>
            </li>
        </div>
    )
}

export default CartItem;