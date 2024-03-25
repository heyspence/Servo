import csrfFetch from "./csrf";

const RECEIVE_REMINDER = "reminders/RECEIVE_REMINDER"

const receiveReminder = reminder => ({
    type: RECEIVE_REMINDER,
    reminder
})

export const createReminder = (reminder) => async dispatch => {
    debugger
    const response = await csrfFetch(`/api/reminders`, {
        method: "POST", 
        body: JSON.stringify(reminder),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    debugger
    if (response.ok) {
        const data = await response.json(); 
        dispatch(receiveReminder(data.reminder))
    }
}

const remindersReducer = (state = {}, action) => {
    let newState = { ...state }
    switch(action.type){
        case(RECEIVE_REMINDER):
            return newState;
        default:
            return newState
    }
}

export default remindersReducer;