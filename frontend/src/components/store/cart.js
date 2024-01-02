import csrfFetch from "./csrf";

const RECEIVE_CART_ITEM = 'cart/RECEIVE_CART_ITEM'
const REMOVE_CART_ITEM = 'cart/REMOVE_CART_ITEM'
const RECEIVE_CART_ITEMS = 'cart/RECEIVE_CART_ITEMS'
const REMOVE_CART_ITEMS = 'cart/REMOVE_CART_ITEMS'
const TOGGLE_CART = 'cart/TOGGLE_CART'
const ASSIGN_CART = 'cart/ASSIGN_CART'

const receiveCartItem = cartItem => ({
    type: RECEIVE_CART_ITEM,
    cartItem
})

const receiveCartItems = cartItems => ({
    type: RECEIVE_CART_ITEMS,
    cartItems
})

const removeCartItem = cartItemId => ({
    type: REMOVE_CART_ITEM,
    cartItemId
})

export const removeCartItems = () => ({
    type: REMOVE_CART_ITEMS
})

export const toggleCart = () => ({
    type: TOGGLE_CART
})

export const assignCart = (vendor) => ({
    type: ASSIGN_CART,
    vendor
})

export const deleteCartItems = userId => async dispatch => {
    const res = await csrfFetch(`/api/user/${userId}/cart_items/destroy_all`,{
        method: 'DELETE'
    })

    if(res.ok){
        dispatch(removeCartItems())
    }
}

export const addToCart = cartItem => async dispatch =>{
    const res = await csrfFetch(`/api/cart_items`,
        {method: "POST",
        body: JSON.stringify(cartItem)})
        if(res.ok){
            const data = await res.json();
            dispatch(receiveCartItem(data.cartItem))
        }
}

export const removeFromCart = cartItemId => async dispatch => {
    const res = await csrfFetch(`/api/cart_items/${cartItemId}`,
        {method: "DELETE",
        body: cartItemId})
    
    if(res.ok){
        dispatch(removeCartItem(cartItemId))
    }
}

export const getCart = user_id => async dispatch => {
    const res = await csrfFetch(`/api/user/${user_id}/cart_items`)

    if(res.ok){
        const data = await res.json();
        dispatch(receiveCartItems(data))
    }
}

const cartReducer = (state = { isCartOpen: false, cartItems: {}, vendor: null}, action) => {
    let newState = { ...state }
    switch(action.type){
        case(RECEIVE_CART_ITEM):
            newState[action.cartItem.id] = action.cartItem
            return newState;
        case(RECEIVE_CART_ITEMS):
            newState = { ...state, ...action.cartItems };
            return newState
        case(REMOVE_CART_ITEM):
            delete newState.cartItems[action.cartItemId];
            return newState;
        case(REMOVE_CART_ITEMS):
            newState.cartItems = {}
            return newState
        case(TOGGLE_CART):
            newState.isCartOpen = !state.isCartOpen;
            return newState
        case(ASSIGN_CART):
            newState.vendor = action.vendor
            return newState
        default:
            return newState
    }
}

export default cartReducer;