import { useSelector } from 'react-redux';
import csrfFetch from '../../store/csrf';
import './VendorAuthorization.css'
import { useGoogleLogin } from '@react-oauth/google';
import { isLoggedIn } from '../../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const VendorAuthorization = () =>{  
    const userLoggedIn = useSelector(isLoggedIn);
    const history = useHistory();

    if(!userLoggedIn){
        history.push('/')
    }

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        scope: 'https://www.googleapis.com/auth/calendar.events.freebusy',
        prompt: 'consent',
        onSuccess: async (codeResponse) => {
            // console.log(codeResponse); // Contains the authorization code

            // Example of sending the authorization code to your backend
            try {
                const response = await csrfFetch('http://localhost:5002/api/auth/google/callback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ code: codeResponse.code }),
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error sending authorization code to backend:', error);
            }
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return(
        <button onClick={() => googleLogin()}>Connect Google Calendar</button>
    )
}

export default VendorAuthorization