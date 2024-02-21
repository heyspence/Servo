import { useDispatch } from 'react-redux';
import './Menu.css'
import { logout } from '../../store/session';
import { ReactComponent as CloseIcon } from '../../../assets/svg/Close.svg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Menu = ({isMenuOpen, closeMenu}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    if(!isMenuOpen) return null;
    
    const handleSignOut = () => {
        closeMenu();
        dispatch(logout());
        history.push('/')
    }

    const handleMenuClick = (e) => {
        e.stopPropagation();
    }

    const handleHomeClick = () => {
        closeMenu();
        history.push('/');
    }

    const handleOrdersClick = () => {
        closeMenu();
        history.push('/orders')
    }

    const handleAccountClick = () => {
        closeMenu();
        history.push('/account')
    }

    const handleRecurringClick = () => {
        closeMenu();
        history.push('/recurring-orders')
    }

    const handleHelpClick = () => {
        closeMenu();
        history.push('/contact-us')
    }

    return(
        <div className="menu-backdrop" onClick={closeMenu}>
            <div className="menu-main" onClick={handleMenuClick}>
                <div className="menu-close">
                    <CloseIcon onClick={closeMenu} />
                </div>
                <ul>
                    <li onClick={handleHomeClick}>Home</li>
                    {/* <li>Promotions</li> */}
                    <li onClick={handleRecurringClick}>Recurring</li>
                    <li onClick={handleOrdersClick}>Orders</li>
                    <li onClick={handleAccountClick}>Account</li>
                    {/* <li>--</li> */}
                    {/* <li>Payment</li> */}
                    {/* <li>Gift Card</li> */}
                    {/* <li>--</li> */}
                    <li onClick={handleHelpClick}>Help</li>
                    <li onClick={handleSignOut}>Sign Out</li>
                </ul>
            </div>
        </div>
    )
}

export default Menu;