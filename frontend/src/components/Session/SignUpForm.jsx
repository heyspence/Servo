import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './SignUpForm.css'
import { isLoggedIn, signUp } from '../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Errors from './Errors';
import { ReactComponent as CloseIcon } from '../../assets/svg/Close.svg'

const SignUpForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const userLoggedIn = useState(isLoggedIn);
    const history = useHistory();

    const [signUpFormValues, setSignUpFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        addressesAttributes: {
            streetAddress: '',
            street_address_2: '',
            city: '',
            state: 'UT',
            zipCode: '',
            default: true
        }
    });

    useEffect(()=>{
        if(!userLoggedIn){
            onClose();
            history.push('/home')
        }
    },[userLoggedIn, history, onClose])

    const submitHandler = (e) => {
        e.preventDefault();
        const formattedData = {
            ...signUpFormValues,
            addressesAttributes: [signUpFormValues.addressesAttributes]
        }
        dispatch(signUp(formattedData))
    }

    // const signInDemoUser = () =>{
    //     const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);

    //     let user = {
    //         email: `${randomNumber}@dashdoor.com`,
    //         firstName:"Demo",
    //         lastName:"User",
    //         phoneNumber: randomNumber,
    //         password: "password"
    //     }
    //     dispatch(signUp(user)).then(onClose())
    // }

    return (
        <div className='sign-up-form'>
            <CloseIcon onClick={onClose} className="close-icon" />
            <h2>Sign Up </h2>
            <form onSubmit={submitHandler}>
                <div className="form-section">
                    <input type="text" placeholder='First Name' style={{marginRight: '7px'}} value={signUpFormValues.firstName} onChange={(e) => setSignUpFormValues(prevValues => ({...prevValues, firstName: e.target.value}))}/>
                    <input type='text' placeholder='Last Name' value={signUpFormValues.lastName} onChange={(e) => setSignUpFormValues(prevValues => ({...prevValues, lastName: e.target.value}))}/>
                </div>
                <input type="text" placeholder='Email' value={signUpFormValues.email} onChange={(e) => setSignUpFormValues(prevValues => ({...prevValues, email: e.target.value}))}/>
                <input type='tel' placeholder='Phone Number' pattern="[0-9]+" value={signUpFormValues.phoneNumber} onChange={(e) => setSignUpFormValues(prevValues => ({...prevValues, phoneNumber: e.target.value}))}/>
                <input type="text" placeholder='Street Address' value={signUpFormValues.addressesAttributes.streetAddress} onChange={(e) => setSignUpFormValues(prevValues => ({
                    ...prevValues, 
                    addressesAttributes: {
                        ...prevValues.addressesAttributes, 
                        streetAddress: e.target.value
                }}))}/>
                <input type='text' placeholder='Street Address 2 (optional)' value={signUpFormValues.addressesAttributes.street_address_2} onChange={(e) => setSignUpFormValues(prevValues => ({
                    ...prevValues, 
                    addressesAttributes: {
                        ...prevValues.addressesAttributes, 
                        street_address_2: e.target.value
                }}))}/>
                <div className="form-section">
                    <input type="text"  placeholder='City' value={signUpFormValues.addressesAttributes.city} style={{marginRight: '7px', maxWidth: "150px"}} onChange={(e)=> setSignUpFormValues(prevValues => ({
                        ...prevValues,
                        addressesAttributes: {
                            ...prevValues.addressesAttributes,
                            city: e.target.value
                        }
                    }))}/>
                    <select style={{marginRight: '7px'}}>
                        <option>UT</option>
                    </select>
                    <select onChange={e => setSignUpFormValues(prevValues => ({
                        ...prevValues,
                        addressesAttributes: {
                            ...prevValues.addressesAttributes,
                            zipCode: e.target.value
                        }
                    }))}>
                        <option>Zip Code</option>
                        <option>84765</option>
                        <option>84770</option>
                        <option>84780</option>
                        <option>84790</option>
                    </select>
                </div>
                <input type='password' placeholder='Password' value={signUpFormValues.password} onChange={e => setSignUpFormValues(prevValues => ({
                    ...prevValues,
                    password: e.target.value
                }))}/>
                <Errors />
                <p style={{ textAlign: 'center', alignSelf:'center'}}>By tapping “Sign Up” you agree to Servo’s 
                <br/>
                <a href="/terms-of-service">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>.</p>
                <input type="submit" value="Sign Up" className='button' />
            </form>
        </div>
    )
}

export default SignUpForm;