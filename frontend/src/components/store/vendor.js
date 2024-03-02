import csrfFetch from "./csrf";

const RECEIVE_VENDORS = 'vendors/RECEIVE_VENDORS'
const RECEIVE_VENDOR = 'vendor/RECEIVE_VENDOR'
const RECEIVE_SERVICES = 'vendor/RECEIVE_SERVICES'
const RECEIVE_CALENDAR_DATA = 'vendor/RECEIVE_CALENDAR_DATA'
const RECEIVE_CALENDAR_ID = 'vendor/RECEIVE_CALENDAR_ID'
const REMOVE_CALENDAR_ID = 'vendor/REMOVE_CALENDAR_ID'

const recieveVendors = vendors => ({
    type: RECEIVE_VENDORS,
    vendors
})

const recieveVendor = vendor => ({
    type: RECEIVE_VENDOR,
    vendor
})

const recieveServices = services => ({
    type: RECEIVE_SERVICES,
    services
})

const receiveCalendarData = calendarData => ({
    type: RECEIVE_CALENDAR_DATA,
    calendarData
})

export const receiveCalendarId = payload => ({
    type: RECEIVE_CALENDAR_ID,
    payload
})

export const removeCalendarId = id => ({
    type: REMOVE_CALENDAR_ID,
    id
})

export const fetchVendors = () => async dispatch => {
    const res = await csrfFetch('/api/vendors');
    if(res.ok){
        const data = await res.json()
        dispatch(recieveVendors(data))
    }
}

export const fetchVendor = vendorId => async dispatch => {
    try{
        const res = await csrfFetch(`/api/vendors/${vendorId}`);
        if(res.ok){
            const data = await res.json()
            dispatch(recieveVendor(data))
        }else{
            throw new Error('Failed to fetch vendor data')
        }
    }catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchServices = vendorId => async dispatch => {
    const res = await csrfFetch(`/api/vendors/${vendorId}/services`)
    if(res.ok){
        const data = await res.json();
        const keys = Object.values(data)
        if(keys.length > 0){
            dispatch(recieveServices(data))
        }
    }
}

export const fetchCalendarData = vendorId => async dispatch => {
    const res = await fetch(`/api/vendors/${vendorId}/vendor_calendars`)
    if(res.ok){
        let data = await res.json();
        data.id = parseInt(vendorId, 10);
        dispatch(receiveCalendarData(data));
    }else{
        console.log(res)
    }
};

export const updateVendor = vendor => async dispatch => {
    const res = await csrfFetch(`/api/vendors/${vendor.id}`,{
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({vendor})
    })
    if(res.ok){
        let data = await res.json();
        dispatch(recieveVendor(data))
    }else{
        console.log(res)
    }
}

export const findVendorByService = (state, serviceId) =>{
    return ''
    const vendors = Object.values(state.vendors);
    for(let vendor of vendors){
        if(vendor.some(service => service.id === serviceId)){
            return vendor
        }
    }
    return ''
}

const vendorsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch(action.type){
        case RECEIVE_VENDORS:
            var vendors = action.vendors;
            return { ...newState, ...vendors};
        case RECEIVE_VENDOR:
            return { ...newState, ...action.vendor}
        case RECEIVE_SERVICES:
            var vendorId = Object.values(action.services)[0].vendorId
            if (!newState[vendorId]) {
                newState[vendorId] = {};
            }
            newState[vendorId].services = action.services;
            return newState
        case RECEIVE_CALENDAR_DATA:
            var calendarData = action.calendarData
            var id = calendarData.id
            newState[id].calendarData = calendarData
            return newState
        case RECEIVE_CALENDAR_ID:
            var calendarId = action.payload.calendarId
            var id = action.payload.id
            newState[id].calendar = calendarId
            return newState
        case REMOVE_CALENDAR_ID:
            var id = action.id
            delete newState[id].calendar
            return newState
        default: 
            return state;
    }
}

export default vendorsReducer;