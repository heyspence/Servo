import csrfFetch from "./csrf";

const RECEIVE_RESTAURANTS = 'restaurants/RECEIVE_RESTAURANTS'
const RECEIVE_RESTAURANT = 'restaurants/RECEIVE_RESTAURANT'

const recieveRestaurants = restaurants => ({
    type: RECEIVE_RESTAURANTS,
    restaurants
})

const recieveRestaurant = restaurant => ({
    type: RECEIVE_RESTAURANT,
    restaurant
})

export const fetchRestaurants = () => async dispatch => {
    const res = await csrfFetch('/api/restaurants');
    if(res.ok){
        const data = await res.json()
        dispatch(recieveRestaurants(data))
    }
}

export const fetchRestaurant = restaurantId => async dispatch => {
    const res = await csrfFetch(`/api/restaurants/${restaurantId}`);
    if(res.ok){
        const data = await res.json()
        dispatch(recieveRestaurant(data))
    }
}

export const findRestaurantByMenuItem = (state, menuItemId) =>{
    if(!menuItemId) return ''
    const restaurants = Object.values(state.restaurants);

    for(const restaurant of restaurants){
        if(restaurant.menuItems.some(menuItem => menuItem === menuItemId)){
            return restaurant
        }
    }
    return ''
}

const restaurantsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch(action.type){
        case RECEIVE_RESTAURANTS:
            const restaurants = action.restaurants;
            return { ...newState, ...restaurants};
        case RECEIVE_RESTAURANT:
            return { ...newState, ...action.restaurant}
        default: 
            return state;
    }
}

export default restaurantsReducer;