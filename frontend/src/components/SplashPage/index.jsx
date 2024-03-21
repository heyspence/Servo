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
        <main className="splash-page">
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
                    <h1 style={{whiteSpace:'pre', textAlign: 'right', fontWeight: 'bold', fontSize: '39px'}}>
                        Your Time Matters{'\n'}
                        <span style={{
                            color: 'var(--primary-white)'
                        }}>
                            Book Online
                        </span>
                    </h1>
                </div>
            </div>
            <div className="splash-page-section three-step-section">
                <div className="splash-page-icon">
                    <img className="splash-page-icon-image" src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-04.png" />
                    <h3>1. Online Quote</h3>
                    <p>No waiting, no surprises. Uncover your exact cost in moments.</p>
                </div>
                <div className="splash-page-icon">
                    <img className="splash-page-icon-image" src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-08.png" />
                    <h3>2. Instant Schedule</h3>
                    <p>Select the time that works for you. It’s as simple as picking a day on your calendar.</p>
                </div>
                <div className="splash-page-icon">
                    <img className="splash-page-icon-image" src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-09.png" />
                    <h3>3. Secure Pay</h3>
                    <p>Rest easy knowing your payment and personal details are protected.</p>
                </div>
            </div>
            <div className="splash-page-section logo-section">
                <div className="splash-page-logo-container">
                    <img className="splash-page-logo" src="https://spencerheywood.com/images/servo/Pictures/web_optimized/maid_to_perfection_logo.png" />
                    <img className="splash-page-logo" src="https://spencerheywood.com/images/servo/logos_and_icons/lilymaid-logo.png"/>
                    <img className="splash-page-logo" src="https://spencerheywood.com/images/servo/logos_and_icons/Screen%20Shot%202021-06-21%20at%2010.19.09%20PM.png"/>
                    <img className="splash-page-logo" src="https://spencerheywood.com/images/servo/logos_and_icons/refresh-ecowash-logo.png"/>
                    <img className="splash-page-logo" src="https://spencerheywood.com/images/servo/logos_and_icons/Ease-Logo-A1%20%282%29%20%283%29%20copy%202.png"/>
                    <img className="splash-page-logo" src="https://spencerheywood.com/images/servo/Pictures/web_optimized/provent_pest_control_logo.jpeg" />
                    <img className="splash-page-logo" src="https://spencerheywood.com/images/servo/Pictures/web_optimized/emerald_pest_control_logo.png" />
                    <img className="splash-page-logo" src="https://spencerheywood.com/images/servo/Pictures/web_optimized/2-Local-Gals-Logo.webp" />
                    <img className="splash-page-logo" src="https://spencerheywood.com/images/servo/Pictures/web_optimized/bug_blasters_pest_control_logo.png" />
                </div>
            </div>
            <div className="splash-page-section" style={{paddingBottom: '100px'}}>
                <img className="splash-page-image" src="https://spencerheywood.com/images/servo/Pictures/garbage_can_cleaning/Servo%20Pictures-43.jpg" />
                <div className="section-text">
                    <h2>Calling Service Providers and Entrepreneurs!</h2>
                    <h3 style={{fontWeight:'normal', lineHeight:'30px'}}>Do you run a service-oriented business in St. George? Grow your business with Servo.</h3>
                    <p style={{lineHeight:'25px', 'textUnderlineOffset': "8px"}}>Our online booking platform is dedicated to home services, offering your clients a seamless 3-click booking experience integrated into your existing flow. Take the first step to becoming one of our platform's first vendors. Click here to <a href='/vendor-onboarding'>learn more</a>.</p>
                </div>
            </div>
        </main>
    )
};

export default SplashPage;