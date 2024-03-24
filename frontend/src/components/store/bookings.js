import csrfFetch from "./csrf";

const RECEIVE_BOOKING = 'booking/RECEIVE_BOOKING'
const REMOVE_BOOKING = 'booking/REMOVE_BOOKING'
const RECEIVE_BOOKINGS = 'booking/RECEIVE_BOOKINGS'
const REMOVE_BOOKINGS = 'booking/REMOVE_BOOKINGS'

const receiveBooking = booking => ({
    type: RECEIVE_BOOKING,
    booking
})

const receiveBookings = bookings => ({
    type: RECEIVE_BOOKINGS,
    bookings
})

const removeBooking = bookingId => ({
    type: REMOVE_BOOKING,
    bookingId
})

export const removeBookings = () => ({
    type: REMOVE_BOOKINGS
})

export const createBooking = booking => async dispatch =>{
    try{
        const res = await csrfFetch(`/api/bookings`,
            {method: "POST",
            body: JSON.stringify(booking)})
            if(res.ok){
                const data = await res.json();
                dispatch(receiveBooking(data.booking))
            }
    }catch(error){
        console.log(error)
    }
}

export const removeFromCart = bookingId => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`,
        {method: "DELETE",
        body: bookingId})
    
    if(res.ok){
        dispatch(removeBooking(bookingId))
    }
}

export const getBookings = user_id => async dispatch => {
    const res = await csrfFetch(`/api/user/${user_id}/bookings`)

    if(res.ok){
        const data = await res.json();
        dispatch(receiveBookings(data.bookings))
    }
}

export const updateBooking = booking => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${booking.booking.id}`,{
        method: 'PUT',
        body: JSON.stringify(booking)
    })
    if(res.ok){
        const data = await res.json()
        dispatch(receiveBooking(data.booking))
    }
}

export const createOrder = booking => async dispatch => {
    const res = await csrfFetch(`/api/orders/${booking.booking.id}/create-order`,{
        method: 'PATCH',
        body: JSON.stringify(booking)
    })
    if(res.ok){
        const data = await res.json()
        dispatch(receiveBooking(data.booking))
    }
}

const bookingsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch(action.type){
        case(RECEIVE_BOOKING):
            newState[action.booking.id] = action.booking
            return newState;
        case(RECEIVE_BOOKINGS):
            newState = { ...state, ...action.bookings };
            return newState
        case(REMOVE_BOOKING):
            delete newState.bookings[action.bookingId];
            return newState;
        default:
            return newState
    }
}

export default bookingsReducer;