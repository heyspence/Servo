import csrfFetch from "./csrf"

const RECIEVE_ORDERS = 'orders/RECIEVE_ORDERS'
const RECIEVE_ORDER = 'orders/RECIEVE_ORDER'

const recieveOrders = orders => ({
    type: RECIEVE_ORDERS,
    orders
})

const recieveOrder = order => ({
    type: RECIEVE_ORDER,
    order
})


export const fetchOrders = userId => async dispactch => {
    const res = await csrfFetch(`/api/user/${userId}/orders`)

    if(res.ok){
        const data = await res.json()
        dispactch(recieveOrders(data))
    }
}

export const createOrder = order => async dispatch => {
    const res = await csrfFetch(`/api/orders`,{
        method: 'POST',
        body: JSON.stringify(order)
    })
    if(res.ok){
        const data = res.json();
        dispatch(recieveOrder(data))
    }
}

const ordersReducer = (state = {}, action) => {
    let newState = { ...state }
    switch(action.type){
        case RECIEVE_ORDERS:
            return { ...action.orders.orders }
        case RECIEVE_ORDER:
            return { ...newState, ...action.order}
        default:
            return newState;
    }
}

export default ordersReducer;