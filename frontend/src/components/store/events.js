// import csrfFetch from "./csrf"

const RECEIVE_EVENTS = 'events/RECEIVE_EVENTS'

// export const createEvent = event => async dispatch => {
//     const res = await csrfFetch(`/api/events`,{
//         method: "POST",
//         body: JSON.stringify(event)
//     })
//     if(res.ok){
//         const data = await res.json();
//         dispatch({
//             type: RECEIVE_EVENTS,
//             events: data
//         })
//     }
// }

const eventsReducer = (state = {}, action) => {
    let newState = {...state}
    switch(action.type){
        case(RECEIVE_EVENTS):
            return action.events
        default:
            return newState
    }
}

export default eventsReducer;