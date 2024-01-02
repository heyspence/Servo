const RECEIVE_IMAGES = 'images/RECEIVE_IMAGES'

const receiveImages = ({images}) => ({
    type: RECEIVE_IMAGES,
    images
})

export const fetchImages = (vendor_id) => async dispatch =>{
    const res = await fetch(`/api/vendors/${vendor_id}/images`)
    if(res.ok){
        const data = await res.json();
        dispatch(receiveImages(data))
    }
}

const imagesReducer = (state = {}, action) =>{
    let newState = {...state}
    switch(action.type){
        case RECEIVE_IMAGES:
            return { ...action.images}
        default:
            return newState
    }
}

export default imagesReducer;