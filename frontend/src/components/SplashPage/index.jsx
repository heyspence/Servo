import './SplashPage.css'
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const SplashPage = props => {
    const userLoggedIn = useSelector(isLoggedIn);
    const history = useHistory();
    
    if(userLoggedIn){history.push('/home');}
    
    const handleCreateAccount = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    const backgroundStyle = {
        // backgroundImage: `url(${splashPageImage})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat'
        backgroundColor: 'var(--secondary-white)'
    };

    return (
        <main>
            <div className='splash-page-main main-section' style={backgroundStyle}>
                {/* <img src="https://spencerheywood.com/images/servo/logos/logo_-01.png" /> */}
                {/* <h1><span className="header-subtext">St George, UT</span><br />Home Services</h1> */}
            </div>
            <div className="splash-page-second main-section">
                <div className="main-section-text">
                    <h2>Click-to-Buy <br className="media-screen-hidden"/>Home Services</h2>
                    <h3>Local Experts, Tailored Care</h3>
                    <p>Discover the ease of booking top-rated home services right in your neighborhood. From thorough cleaning to regular upkeep, connect with the finest local professionals. Simplify your life with our intuitive platform — where quality meets convenience.</p>
                    <button onClick={handleCreateAccount}>Create Account</button>
                </div>
                <img className="splash-page-second-img" src="https://spencerheywood.com/images/servo/highlights/professional-home-cleaning-service.jpg" alt="Professional home cleaning service in action with smiling cleaner vacuuming living room, offering easy online booking and scheduling." />
            </div>
            <div className="splash-page-third main-section">
                <img className="splash-page-third-img" src="https://spencerheywood.com/images/servo/highlights/professional-window-cleaning-technician-action.jpg" alt="Skilled window cleaning technician with professional tools and equipment wiping residential window, available for online booking and scheduling." />
                <div className="main-section-text third-section-text">
                    <h2>Book Recurring Services</h2>
                    <h3>Set It and Forget It</h3>
                    <p>Discover Servo's hassle-free recurring services. Enjoy automated bookings, local expertise, and consistent care.</p>
                    <button onClick={handleCreateAccount}>Create Account</button>
                </div>
            </div>
        </main>
    )
};

export default SplashPage;