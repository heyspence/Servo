import './HomeNav.css'
import { ReactComponent as HamburgerMenu } from './HamburgerMenu.svg'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveAddress, logout } from '../../store/session'
import { ReactComponent as LogoSvg} from '../../../assets/svg/logo_master.svg'
import { setHomeView } from '../../store/ui';

const HomeNav = ({ display, toggleMenu }) => {
    const { userAddress, homeView, vendorId, vendors } = useSelector(state => ({
        userAddress: getActiveAddress(state),
        homeView: state.ui?.homeView,
        vendorId: state.session.user?.vendorId,
        vendors: state.vendors
    }));
    const dispatch = useDispatch()
    const history = useHistory();
    if(!display) return null

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
        if (homeView === "vendor") {
            dispatch(setHomeView("user"));
            history.push(`/vendors/${vendorId}`);
        } else {
            dispatch(setHomeView("vendor"));
            history.push(`/vendors/${vendorId}/dashboard`);
        }
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
                    {vendorId && <>
                                    <span>User</span>
                                    <div onClick={switchHomeView} className="recurring-toggle-background">
                                        <div className={`recurring-toggle-circle ${homeView !== "user" && 'recurring-circle-active'}`} />
                                    </div>
                                    <span>Vendor</span>
                                </>
                    }
                    <a className="user-address">{userAddress?.streetAddress + " " + userAddress?.streetAddress2}</a>
                </div>
            </div>
        </header>
        :
        <header>
            <div id="vendor-home-nav" className="home-nav">
                <div className="home-nav-left">
                    <div className="logo-container" onClick={handleClickToHome}>
                        <LogoSvg className="main-logo" alt="Servo Official Logo" />
                    </div>
                    <h2>{vendors?.[vendorId]?.name}</h2>
                </div>
                <div className="home-nav-right">
                    <div className='toggle-div'>
                        <span>User</span>
                        <div onClick={switchHomeView} className="recurring-toggle-background">
                            <div className={`recurring-toggle-circle ${homeView === "vendor" && 'recurring-circle-active'}`} />
                        </div>
                        <span>Vendor</span>
                    </div>
                    <button onClick={handleSignOut} className='vendor-logout'>Logout</button>
                </div>
            </div>
        </header>
    )
}

export default HomeNav