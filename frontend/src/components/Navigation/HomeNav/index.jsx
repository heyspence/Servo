import './HomeNav.css'
// import logo from '../../../assets/images/doordash-logo-red.png'
import { ReactComponent as CartIcon } from './CartIcon.svg'
import { ReactComponent as HamburgerMenu } from './HamburgerMenu.svg'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveAddress } from '../../store/session'
import { ReactComponent as LogoSvg} from '../../../assets/svg/logo_master.svg'


const HomeNav = ({ display, toggleMenu, toggleCart }) => {
    const userAddress = useSelector(state => getActiveAddress(state))
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    if(!display) return null

    const handleClickToHome = () => {
        history.push('/')
    }

    const handleToggleCart = () =>{
            dispatch(toggleCart())
    }

    return (
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
    )
}

export default HomeNav