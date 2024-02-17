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
            <div style={{
                height: '800px',
                width: '100%',
                backgroundColor: 'rgb(163 211 229)',
                backgroundImage:"url('https://spencerheywood.com/images/servo/Pictures/web_optimized/servo_web_banner.avif')", 
                backgroundSize: 'cover',
                backgroundPosition: '100% center',
                position: 'relative',
                zIndex: '10',
                marginTop: '-100px',
                boxShadow: '-5px 0 10px -5px rgba(0, 0, 0, 0.5)'
                }}>
                <div 
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10,
                        position: 'absolute',
                        right: '5%',
                        top: '215px'
                    }}
                >
                    <h1 style={{whiteSpace:'pre', textAlign: 'right', fontWeight: 'bold', fontSize: '35px'}}>
                        Book All Your Services{'\n'}
                        <span style={{
                            color: 'var(--primary-white)'
                        }}>
                            Online.
                        </span>
                    </h1>
                </div>
            </div>
            {/* <img style={{width: '300px', height: '300px'}} src="https://spencerheywood.com/images/servo/Pictures/web_optimized/professional-home-cleaning-service.avif" alt="Professional home cleaning service in action with smiling cleaner vacuuming living room, offering easy online booking and scheduling." /> */}
            {/* <img style={{width: '50%'}} src="https://spencerheywood.com/images/servo/Pictures/web_optimized/professional-window-cleaning-technician-action.avif" alt="Skilled window cleaning technician with professional tools and equipment wiping residential window, available for online booking and scheduling." /> */}
        </main>
    )
};

export default SplashPage;