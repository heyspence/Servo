import { useEffect, useState } from 'react';
import csrfFetch from '../../../../store/csrf';
import './VendorAuthorization.css'
import { useGoogleLogin } from '@react-oauth/google';
import { ReactComponent as Close } from '../../../../../assets/svg/Close.svg'
import { useDispatch } from 'react-redux';
import { receiveCalendarId, removeCalendarId } from '../../../../store/vendor';

const VendorAuthorization = ({vendor}) =>{ 
    const [isConnected, setIsConnected] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=>{
        setIsConnected(vendor ? vendor.calendar.apiIntegrated : false)
    }, [vendor])

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        scope: 'https://www.googleapis.com/auth/calendar.events.owned',
        prompt: 'consent',
        onSuccess: async (codeResponse) => {
            try {
                const response = await csrfFetch('/api/auth/google/callback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ code: codeResponse.code }),
                });
                if(response.ok){
                    let data = await response.json();
                    dispatch(receiveCalendarId({id: vendor.id, calendarId: data.calendarId}))
                    setIsConnected(true);
                }
            } catch (error) {
                console.error('Error sending authorization code to backend:', error);
            }
        },
        onError: errorResponse => console.log(errorResponse),
    });

    const deleteCalendar = async() => {
        const res = await csrfFetch(`/api/vendor_calendars/${vendor.calendar.id}`,{
            method: "DELETE"
        })

        if(res.ok){
            dispatch(removeCalendarId)
            setIsConnected(false)
        }else{
            let data = await res.json()
            console.error(`Unable to delete calendar: ${data.errors}`)
        }
    }

    const calendarButton = () => {
        if(isConnected){
            return <div className="calendar-button-container">
                        <div className="status-circle"></div>
                        <div className="connect-google-calendar--disconnect">Connected </div>
                        <Close className="calendar-disconnect-button" onClick={deleteCalendar} style={{transform: "scale(0.75)"}}/>
                    </div>
        }else{
            return <button className="connect-google-calendar" onClick={() => googleLogin()}>Connect</button>
        }
    }

    return(
        calendarButton()
    )
}

export default VendorAuthorization