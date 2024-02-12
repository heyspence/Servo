import './HomeNav.css'
import { ReactComponent as HamburgerMenu } from './HamburgerMenu.svg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { getActiveAddress } from '../../store/session'
import { ReactComponent as LogoSvg} from '../../../assets/svg/logo_master.svg'


const HomeNav = ({ display, toggleMenu, toggleCart }) => {
    const { userAddress, userIsVendor, vendorId } = useSelector(state => ({
        userAddress: getActiveAddress(state),
        userIsVendor: !!state.session.user?.vendorId,
        vendorId: state.session.user?.vendorId
    }));

    const history = useHistory();
    if(!display) return null

    const handleClickToHome = () => {
        if(userIsVendor){
            history.push(`/vendors/${vendorId}/dashboard`)
        }else{
            history.push('/home')
        }
    }

    return (
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
                    <a className="user-address">{userAddress?.address}</a>
                </div>
            </div>
        </header>
    )
}

export default HomeNav