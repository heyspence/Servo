import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../Modal';
import MenuItemShow from '../MenuItemShow';
import './MenuItemIndexItem.css'
import { addToCart, toggleCart } from '../../store/cart';
import { findVendorByMenuItem } from '../../store/vendor';
import { receiveErrors } from '../../store/errors';

const MenuItemIndexItem = ({id, name, imageUrl, price}) => {
    const [isShowOpen, setIsShowOpen] = useState(false);
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.user?.id)
    const cartVendorId = useSelector(state => state.cart.vendor.id)
    const Vendor = useSelector(state => findVendorByMenuItem(state, id))

    const toggleIsShowOpen = () =>{
        setIsShowOpen(!isShowOpen)
    }

    const handleAddToCart = () => {
        if(cartVendorId === undefined || cartVendorId === Vendor?.id){
            let cart_item = {
                user_id: currentUserId,
                menu_item_id: id
            }
            toggleIsShowOpen()
            dispatch(addToCart(cart_item)).then(()=>{
                dispatch(toggleCart())
            })
        }else{
            dispatch(toggleCart())
            dispatch(receiveErrors(["Items from only one service provider allowed per cart. Please remove current items to add new ones."]))
        }
    }

    return (
        <>
            <li className="menu-item-index-item">
                <img src={imageUrl} onClick={toggleIsShowOpen} alt="menu item"/>
                    <button onClick={toggleIsShowOpen}>Add</button>
                <p className="menu-item-name">{name}</p>
                <p className="menu-item-price">${price.toFixed(2)}</p>
            </li>
            <Modal isOpen={isShowOpen} onClose={toggleIsShowOpen}>
                <MenuItemShow key={id} handleAddToCart={handleAddToCart} imageUrl={imageUrl} onClose={toggleIsShowOpen} name={name} price={price} />
            </Modal>
        </>
    )
}

export default React.memo(MenuItemIndexItem);