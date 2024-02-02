import { useEffect, useState } from 'react';
import csrfFetch from '../../../../store/csrf';
import './VendorAuthorization.css'
import { useGoogleLogin } from '@react-oauth/google';
const VendorAuthorization = ({vendor}) =>{ 
    const [isConnected, setIsConnected] = useState(!!vendor?.calendar)

    useEffect(()=>{
        setIsConnected(!!vendor?.calendar)
    }, [vendor])

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        scope: 'https://www.googleapis.com/auth/calendar.events.freebusy',
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
                    setIsConnected(true);
                }
            } catch (error) {
                console.error('Error sending authorization code to backend:', error);
            }
        },
        onError: errorResponse => console.log(errorResponse),
    });

    const calendarButton = () => {
        if(isConnected){
            return <button className="connect-google-calendar--disconnect">Disconnect Google Calendar</button>
        }else{
            return <button className="connect-google-calendar" onClick={() => googleLogin()}>Connect Google Calendar</button>
        }
    }

    return(
        calendarButton()
    )
}

export default VendorAuthorization