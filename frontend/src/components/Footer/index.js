import { useSelector } from 'react-redux';
import './Footer.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Footer = () => {
    const vendorId = useSelector(state => state.session?.user ? state.session.user.vendorId : '');
    const history = useHistory();

    const handleLinkClick = (location) => {
        history.push(location)
    }

    return (
        <footer>
            <div className="footer">
                <div className="footer-column">
                    <h3>About</h3>
                    <a onClick={() => handleLinkClick('/about-us')}>About Us</a>
                    <a onClick={() => handleLinkClick('/privacy-policy')}>Privacy Policy</a>
                    <a onClick={() => handleLinkClick('/terms-of-service')}>Terms of Service</a>
                </div>
                <div className="footer-column">
                    <h3>Service Providers</h3>
                    {/* <a href={`/vendors/${vendorId}/dashboard`}>Home</a> */}
                    <a onClick={()=> handleLinkClick('/contact-us')}>Sign Up</a>
                </div>
                <div className="footer-column">
                    <h3>Get in Touch</h3>
                    <a onClick={()=> handleLinkClick('/contact-us')}>Contact Us</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;