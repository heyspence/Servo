import csrfFetch from "./csrf"

const RECEIVE_MENU_ITEMS = 'menuItems/RECEIVE_MENU_ITEMS'
const RECEIVE_MENU_ITEM = 'menuItems/RECEIVE_MENU_ITEM'

const receiveMenuItems = menuItems =>({
    type: RECEIVE_MENU_ITEMS,
    menuItems
})

const receiveMenuItem = menuItem => ({
    type: RECEIVE_MENU_ITEM,
    menuItem
})


export const fetchMenuItems = restaurantId => async dispatch => {
    const res = await csrfFetch(`/api/restaurants/${restaurantId}/menu_items`)
    if(res.ok){
        const data = await res.json()
        dispatch(receiveMenuItems(data))
    }
}

export const fetchMenuItem = menuItemId => async dispatch => {
    const res = await fetch(`/api/menu_items/${menuItemId}`)
    if(res.ok){
        const data = await res.json()
        dispatch(receiveMenuItem(data))
    }else{
        const data = await res.json()
    }
}

const menuItemsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch(action.type){
        case RECEIVE_MENU_ITEMS:
            return { ...newState, ...action.menuItems}
        case RECEIVE_MENU_ITEM:
            return { ...newState, ...action.menuItem }
        default:
            return state;
    }
}

export default menuItemsReducer;