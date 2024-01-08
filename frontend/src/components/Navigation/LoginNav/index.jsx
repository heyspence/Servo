import { useState } from "react";
import Modal from "../../Modal";
import './LoginNav.css'
import SignUpForm from "../../Session/SignUpForm";
import SignInForm from '../../Session/SignInForm'
// import logo from '../../../assets/images/modified-icon.png'
import { removeErrors } from "../../store/errors";
import { useDispatch } from "react-redux";

const LoginNav = ({ display }) => {
    const dispatch = useDispatch();
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    
    if(!display) return null
    
    const handleSignUpOpen = () => {
        document.body.classList.add('no-scroll')
        setIsSignUpOpen(true);
    }
    const handleSignUpClose = () => {
        document.body.classList.remove('no-scroll')
        dispatch(removeErrors());
        setIsSignUpOpen(false);
    }
    const handleSignInOpen = () => {
        document.body.classList.add('no-scroll')
        setIsSignInOpen(true);
    }
    const handleSignInClose = () => {
        document.body.classList.remove('no-scroll')
        dispatch(removeErrors());
        setIsSignInOpen(false);
    }

    return (
        <div className='main-nav-bar'>
            {/* <img src="https://spencerheywood.com/images/servo/logos/logo_blue_yellow_copy2.png" alt="main logo for dashdoor" className='main-nav-icon' /> */}
            <div></div>
            <img className="main-nav-logo" src="https://spencerheywood.com/images/servo/logos/logo_-06.png" alt="Dark blue 'SERVO' text logo with a checkmark, representing a St. George, Utah-based company offering online booking for home services like cleaning and pest control."/>
            {/* <h1 className="main-nav-logo"><span className="header-subtext">Home Services</span><br />St George, UT</h1> */}
            <div className='main-nav-links'>
                <button className='main-sign-up-button button'onClick={handleSignUpOpen}>Create Account</button>
                <button className='main-sign-in-button button' onClick={handleSignInOpen}>Sign In</button>
                <Modal isOpen={isSignUpOpen} onClose={handleSignUpClose}>
                    <SignUpForm />
                </Modal>
                <Modal isOpen={isSignInOpen} onClose={handleSignInClose}>
                    <SignInForm />
                </Modal>
            </div>
        </div>
    )

}

export default LoginNav;