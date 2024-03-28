import './HomeNav.css'
import { ReactComponent as HamburgerMenu } from './HamburgerMenu.svg'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveAddress, logout } from '../../store/session'
import { ReactComponent as LogoSvg} from '../../../assets/svg/logo_master.svg'
// import { setHomeView } from '../../store/ui';


const HomeNav = ({ display, toggleMenu }) => {
    const { userAddress, vendorId } = useSelector(state => ({
        userAddress: getActiveAddress(state),
        // userIsVendor: !!state.session.user?.vendorId,
        // homeView: state.ui?.homeView,
        vendorId: state.session.user?.vendorId
    }));
    const dispatch = useDispatch()
    const history = useHistory();
    if(!display) return null
    const homeView = localStorage.getItem("homeView")
    console.log('🦋🦋🦋 ~ homeView:', homeView);

    const handleClickToHome = () => {
        if(homeView === "vendor"){
            history.push(`/vendors/${vendorId}/dashboard`);
        }else{
            history.push('/home');
        }
    }

    const handleSignOut = () => {
        dispatch(logout());
        window.location.href = '/';
    }

    const switchHomeView = () => {
        if (homeView === "vendor") localStorage.setItem("homeView", "user"); // does not automatically rerender/ switch views unless refresh
        // dispatch(setHomeView("user"))
    }

    return (
        homeView === "user" ?         
        <header>
            <div className="home-nav">
                <div className="home-nav-left">
                    <HamburgerMenu onClick={toggleMenu}/>
                    <div className="home-nav-left-inner-container">
                        <div className="logo-container" onClick={handleClickToHome}>
                            <LogoSvg className="main-logo" alt="Servo Official Logo" />
                        </div>
                        <button className="location-btn">ST GEORGE, UT</button>
                    </div>
                </div>
                <div className="home-nav-right">
                    <a className="user-address">{userAddress?.streetAddress + " " + userAddress?.streetAddress2}</a>
                </div>
            </div>
        </header>
        :
        <header>
            <div className="home-nav">
                <div className="home-nav-left">
                    <div className="home-nav-left-inner-container">
                        <div className="logo-container" onClick={handleClickToHome}>
                            <LogoSvg className="main-logo" alt="Servo Official Logo" />
                        </div>
                        {/* get vendor name */}
                    </div>
                </div>
                <div className="home-nav-right">
                    {/* toggle between accts */}
                    <div onClick={switchHomeView} className="recurring-toggle-background">
                        <div className={`recurring-toggle-circle ${homeView === "vendor" && 'recurring-circle-active'}`} />
                    </div>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </header>
    )
}

export default HomeNav