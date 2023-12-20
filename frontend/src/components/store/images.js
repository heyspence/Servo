const RECEIVE_IMAGES = 'images/RECEIVE_IMAGES'

const receiveImages = ({images}) => ({
    type: RECEIVE_IMAGES,
    images
})

export const fetchImages = (restaurant_id) => async dispatch =>{
    const res = await fetch(`/api/restaurants/${restaurant_id}/images`)
    if(res.ok){
        const data = await res.json();
        dispatch(receiveImages(data))
    }
}

const imagesReducer = (state = {}, action) =>{
    let newState = {...state}
    switch(action.type){
        case RECEIVE_IMAGES:
            console.log(action)
            return { ...action.images}
        default:
            return newState
    }
}

export default imagesReducer;