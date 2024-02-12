import { useEffect, useState } from 'react';
import csrfFetch from '../../../../store/csrf';
import './VendorAuthorization.css'
import { useGoogleLogin } from '@react-oauth/google';
import { ReactComponent as Close } from '../../../../../assets/svg/Close.svg'

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
            return <div className="calendar-button-container">
                        <div className="status-circle"></div>
                        <div className="connect-google-calendar--disconnect">Connected </div>
                        <Close style={{transform: "scale(0.75)"}}/>
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