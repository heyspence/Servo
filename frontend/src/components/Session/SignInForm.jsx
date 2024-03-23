import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SignInForm.css'
import { signIn} from '../store/session';
import Errors from './Errors';
import { ReactComponent as CloseIcon } from '../../assets/svg/Close.svg';

const SignInForm = ({ onClose }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        let user = {
            email,
            password
        }
        dispatch(signIn(user))
    }

    const signInDemoUser = async () => {
        let user = {
            email: "demo@dashdoor.com",
            password: "password"
        };

        dispatch(signIn(user));
        onClose();
    };

    const signInDemoVendor = async () => {
        let user = {
            email: 'demovendor1@dashdoor.com',
            password: 'password'
        }
        dispatch(signIn(user));
        onClose();
    }

    return (
        <div className='sign-in-form'>
            <CloseIcon onClick={onClose} className="close-icon"/>
            <h2>Sign In </h2>
            <form onSubmit={submitHandler}>
                {/* <label htmlFor="email">Email </label> */}
                <input id="email" type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

                {/* <label htmlFor="new-password">Password </label> */}
                <input id="new-password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>

                {/* <span><p><a onClick={signInDemoUser}>Sign in as demo user</a>| */}
                {/* <a onClick={signInDemoVendor}>Sign in as demo vendor</a></p></span> */}
                <Errors />
                <input type="submit" value="Sign In" className='button' />
                <p>By continuing with the sign in process, we may send you 
                    a one-time verification code via email to the email address 
                    number associated with your account.
                </p>
            </form>
        </div>
    )
}

export default SignInForm;