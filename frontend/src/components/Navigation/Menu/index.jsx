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

    return(
        <div className="menu-backdrop" onClick={closeMenu}>
            <div className="menu-main" onClick={handleMenuClick}>
                <div className="menu-close">
                    <CloseIcon onClick={closeMenu} />
                </div>
                <ul>
                    <li onClick={handleHomeClick}>Home</li>
                    <li>Pickup</li>
                    <li>Offers</li>
                    <li onClick={handleOrdersClick}>Orders</li>
                    <li>Account</li>
                    <li>Saved Stores</li>
                    <li>Payment</li>
                    <li>Gift Card</li>
                    <li>Manage Dash Pass</li>
                    <li>Help</li>
                    <li onClick={handleSignOut}>Sign Out</li>
                </ul>
            </div>
        </div>
    )
}

export default Menu;