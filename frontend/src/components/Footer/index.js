import { useSelector } from 'react-redux';
import './Footer.css'

const Footer = () => {
    const vendorId = useSelector(state => state.session?.user ? state.session.user.vendorId : '');

    return (
        <footer>
            <div className="footer">
                <div className="footer-column">
                    <h3>About</h3>
                    <a>About Us</a>
                </div>
                <div className="footer-column">
                    <h3>Service Providers</h3>
                    <a href={`/vendors/${vendorId}/dashboard`}>Home</a>
                    <a>Sign Up</a>
                </div>
                <div className="footer-column">
                    <h3>Get in Touch</h3>
                    <a>Contact</a>
                    <a>Suggestions</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;