import csrfFetch, { restoreCSRF } from "./csrf";
import { receiveErrors } from "./errors";

const SET_CURRENT_USER = 'session/SET_CURRENT_USER'
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER'

const storeCurrentUser = user => {
    if(user)sessionStorage.setItem('currentUser', JSON.stringify(user.id));
    else sessionStorage.removeItem('currentUser');
}

const removeCurrentUser = () => {
    sessionStorage.setItem('currentUser', null)
}

const selectCurrentUser = state => state?.session ? state.session.user : null;
export const isLoggedIn = (state) => !!selectCurrentUser(state);

export const signUp = user => async dispatch =>{
    const res = await csrfFetch(`/api/users`,{
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({user: user})
    })
    if(res.ok){
        let data = await res.json()
        dispatch({type: SET_CURRENT_USER, user: data.user})
        storeCurrentUser(data.user)
    }else{
        let data = await res.json();
        dispatch(receiveErrors(data.errors))
    }
}

export const restoreSession = () => async dispatch => {
    const res = await csrfFetch(`/api/session`)
    const token = res.headers.get('X-CSRF-Token')

    if(token){
        sessionStorage.setItem('X-CSRF-Token', token)
    }else{
        sessionStorage.removeItem('X-CSRF-Token')
    }
    
    const data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user))
    dispatch({type: SET_CURRENT_USER, user: data.user})
}


export const signIn = ({email, password}) => async dispatch =>{
    const attemptSignIn = async (retryCount = 0) =>{
        const maxRetries = 1
        try{
            const res = await csrfFetch(`/api/session`,{
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({email, password})
            })

            if(res.ok){
                let data = await res.json()
                    dispatch({type: SET_CURRENT_USER, user: data.user})
                    storeCurrentUser(data.user)
            }else{
                let data = await res.json();

                if(data.errors.includes("Invalid Authenticity Token") && retryCount < maxRetries){
                    await restoreCSRF();
                    return attemptSignIn(retryCount + 1)
                }else{
                    dispatch(receiveErrors(data.errors))
                }
            }
        } catch (error) {
            dispatch(receiveErrors({errors: ['An unexpected error occurred.']}))
        }
    }
    return attemptSignIn();
}


export const logout = () => async dispatch => {
    const res = await csrfFetch(`/api/session`,{
        method: 'DELETE'
    })

    if(res.ok){
        dispatch({type: REMOVE_CURRENT_USER})
        removeCurrentUser();
    }else{
        window.location.reload();
    }
}

const initialState  = {
    user: JSON.parse(sessionStorage.getItem('currentUser'))
}

const sessionReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return {...state, user: action.user};
        case REMOVE_CURRENT_USER:
            return {...state, user: null};
        default:
            return state;
    }
}

export default sessionReducer;