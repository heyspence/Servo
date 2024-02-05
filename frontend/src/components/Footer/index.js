import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="footer-column">
                    <h3>About</h3>
                    <a>About Us</a>
                </div>
                
                <div className="footer-column">
                    <h3>Get in Touch</h3>
                    <a>Contact</a>
                    <a>Suggestions</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                </div>

                <div className="footer-column">
                    <h3>Service Providers</h3>
                    <a>Login</a>
                    <a>Sign Up</a>
                    <a>Insurance</a>
                    <a>Job Completion</a>
                    <a>Terms of Service</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;