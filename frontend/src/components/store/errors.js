const RECEIVE_ERRORS = 'errors/RECEIVE_ERRORS'
const REMOVE_ERRORS = 'errors/REMOVE_ERRORS'

export const receiveErrors = errors =>({
    type: RECEIVE_ERRORS,
    errors
})

export const removeErrors = () => ({
    type: REMOVE_ERRORS
})

const errorsReducer = (state = [], action) => {
    switch(action.type){
        case RECEIVE_ERRORS:
            return action.errors
        case REMOVE_ERRORS:
            return [];
        default: 
            return state;
    }
}

export default errorsReducer;