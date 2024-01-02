import csrfFetch from "./csrf";

const RECEIVE_VENDORS = 'vendors/RECEIVE_VENDORS'
const RECEIVE_VENDOR = 'vendor/RECEIVE_VENDOR'

const recieveVendors = vendors => ({
    type: RECEIVE_VENDORS,
    vendors
})

const recieveVendor = vendor => ({
    type: RECEIVE_VENDOR,
    vendor
})

export const fetchVendors = () => async dispatch => {
    const res = await csrfFetch('/api/vendors');
    if(res.ok){
        const data = await res.json()
        dispatch(recieveVendors(data))
    }
}

export const fetchVendor = vendorId => async dispatch => {
    const res = await csrfFetch(`/api/vendors/${vendorId}`);
    if(res.ok){
        const data = await res.json()
        dispatch(recieveVendor(data))
    }
}

export const findVendorByMenuItem = (state, menuItemId) =>{
    if(!menuItemId) return ''
    const vendors = Object.values(state.vendors);

    for(const vendor of vendors){
        if(vendor.menuItems.some(menuItem => menuItem === menuItemId)){
            return vendor
        }
    }
    return ''
}

const vendorsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch(action.type){
        case RECEIVE_VENDORS:
            const vendors = action.vendors;
            return { ...newState, ...vendors};
        case RECEIVE_VENDOR:
            return { ...newState, ...action.vendor}
        default: 
            return state;
    }
}

export default vendorsReducer;