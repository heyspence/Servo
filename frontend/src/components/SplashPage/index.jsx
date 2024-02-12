import './SplashPage.css'
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';


const SplashPage = () => {
    const { userLoggedIn, user } = useSelector(state => ({
        userLoggedIn: isLoggedIn(state),
        user: state.session?.user
    }))
    const history = useHistory();
    
    useEffect(()=>{
        let destination = user?.vendorId ? `/vendors/${user.vendorId}/dashboard` : '/home'
        if(userLoggedIn){history.push(destination);}
    },[user, userLoggedIn])

    return (
        <main>
            <div 
                style={{
                    height: '250px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px'
                }}
            >
                <h1 style={{whiteSpace:'pre', textAlign: 'right', fontWeight: 'bold', fontSize: '30px'}}>
                    Book All Your Services{'\n'}
                    <span style={{color: 'var(--primary-green)'}}>Online.</span>
                </h1>
            </div>
            {/* <img src="https://spencerheywood.com/images/servo/Pictures/web_optimized/professional-home-cleaning-service.avif" alt="Professional home cleaning service in action with smiling cleaner vacuuming living room, offering easy online booking and scheduling." /> */}
            {/* <img src="https://spencerheywood.com/images/servo/Pictures/web_optimized/professional-window-cleaning-technician-action.avif" alt="Skilled window cleaning technician with professional tools and equipment wiping residential window, available for online booking and scheduling." /> */}
        </main>
    )
};

export default SplashPage;