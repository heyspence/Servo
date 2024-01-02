import csrfFetch from './csrf'

const RECEIVE_REVIEWS = 'reviews/RECEIVE_REVIEWS'
const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
})

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
})

export const fetchReviews = vendor_id => async dispatch =>{
    const res = await fetch(`/api/vendors/${vendor_id}/reviews`)

    if(res.ok){
        const data = await res.json();
        dispatch(receiveReviews(data.reviews))
    }
}

export const createReview = (vendorId, review) => async dispatch => {
    const res = await csrfFetch(`/api/vendors/${vendorId}/reviews`, 
        {method: "POST", body: JSON.stringify(review)}
    )
    if(res.ok){
        const data = await res.json();
        dispatch(receiveReview(data.reviews))
    }
}

const reviewsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch(action.type){
        case RECEIVE_REVIEW:
            return { ...newState, ...action.review}
        case RECEIVE_REVIEWS:
            return { ...action.reviews}
        case REMOVE_REVIEW:
            delete {}
            return {}
        case UPDATE_REVIEW:
            return {}
        default:
            return newState
    }
}

export default reviewsReducer
