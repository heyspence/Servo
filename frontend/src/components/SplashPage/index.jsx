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
    
    const handleCreateAccount = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    const backgroundStyle = {
        backgroundColor: 'var(--secondary-white)'
    };

    return (
        <main>
            <div className='splash-page-main main-section' style={backgroundStyle}>
            </div>
            <div className="splash-page-second main-section">
                <div className="main-section-text">
                    <h2>Click-to-Buy <br className="media-screen-hidden"/>Home Services</h2>
                    <h3>Local Experts, Tailored Care</h3>
                    <p>Discover the ease of booking top-rated home services right in your neighborhood. From thorough cleaning to regular upkeep, connect with the finest local professionals. Simplify your life with our intuitive platform — where quality meets convenience.</p>
                    <button onClick={handleCreateAccount}>Create Account</button>
                </div>
                <img className="splash-page-second-img" src="https://spencerheywood.com/images/servo/Pictures/web_optimized/professional-home-cleaning-service.avif" alt="Professional home cleaning service in action with smiling cleaner vacuuming living room, offering easy online booking and scheduling." />
            </div>
            <div className="splash-page-third main-section">
                <img className="splash-page-third-img" src="https://spencerheywood.com/images/servo/Pictures/web_optimized/professional-window-cleaning-technician-action.avif" alt="Skilled window cleaning technician with professional tools and equipment wiping residential window, available for online booking and scheduling." />
                <div className="main-section-text third-section-text">
                    <h2>Book Recurring Services</h2>
                    <h3>Set It and Forget It</h3>
                    <p>Discover Servo's hassle-free recurring services. Enjoy automated bookings, local expertise, and consistent care.</p>
                    <button onClick={handleCreateAccount}>Join Servo</button>
                </div>
            </div>
        </main>
    )
};

export default SplashPage;