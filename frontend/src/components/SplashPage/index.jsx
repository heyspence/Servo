// import splashPageImage from '../../assets/images/servo_landing_banner.png'
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
        backgroundColor: 'var(--primary-white)'
    };

    return (
        <main>
            <div className='splash-page-main main-section' style={backgroundStyle}>
                <h1><span className="header-subtext">St George, UT</span><br />Home Services</h1>
            </div>
            <div className="splash-page-second main-section">
                <div className="main-section-text">
                    <h2>Click-to-Buy <br className="media-screen-hidden"/>Home Services</h2>
                    <h3>Local Experts, Tailored Care</h3>
                    <p>Discover the ease of booking top-rated home services right in your neighborhood. From thorough cleaning to regular upkeep, connect with the finest local professionals. Simplify your life with our intuitive platform — where quality meets convenience.</p>
                    <button onClick={handleCreateAccount}>Create Account</button>
                </div>
                <img className="splash-page-second-img" src="https://spencerheywood.com/images/servo/highlights/Lily%20Maid%20Cleaning%20Shoot-6.jpg" alt="woman eating a tortilla on a picknick" />
            </div>
            <div className="splash-page-third main-section">
                <img className="splash-page-third-img" src="https://spencerheywood.com/images/servo/highlights/E22A3073.jpg" alt="woman eating a tortilla on a picknick" />
                <div className="main-section-text third-section-text">
                    <h2>Recurring Services with Servo: </h2>
                    <h3>Set It and Forget It</h3>
                    <p>Discover Servo's hassle-free recurring services. Our St. George clients enjoy simple scheduling and management of home maintenance from anywhere. Benefit from automated bookings, local expertise, and consistent care. Join Servo for a streamlined home service experience.</p>
                    <button onClick={handleCreateAccount}>Create Account</button>
                </div>
            </div>
        </main>
    )
};

export default SplashPage;
