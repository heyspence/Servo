import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './UserAccount.css'
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../store/session';
import { useState } from 'react';

const UserAccount = () => {
    const {user} = useSelector(state => {
        return ({
            user: state.session?.user ? state.session.user : {}
        })
    });
    const history = useHistory();
    const [accountFormValues, setAccountFormValues] = useState({...user});

    if(!user){
        history.push('/')
    }

    return (
        <div className="user-account">
            <div className="user-account-backdrop">
                <h1>Account Settings</h1>
                <form>
                    <input type="text" 
                            value={accountFormValues.firstName} 
                            onChange={(e) => {
                                setAccountFormValues(prevValues => (
                                {...prevValues, firstName: e.target.value}
                                ))
                            }}
                    />
                    <input type="text" 
                            value={accountFormValues.lastName} 
                            onChange={(e) => {
                                setAccountFormValues(prevValues => (
                                {...prevValues, lastName: e.target.value}
                                ))
                            }}
                    />
                    <input type="text" 
                            value={accountFormValues.phoneNumber} 
                            onChange={(e) => {
                                setAccountFormValues(prevValues => (
                                {...prevValues, phoneNumber: e.target.value}
                                ))
                            }}
                    />
                    <input type="text" 
                            value={accountFormValues.email} 
                            onChange={(e) => {
                                setAccountFormValues(prevValues => (
                                {...prevValues, email: e.target.value}
                                ))
                            }}
                    />
                </form>
            </div>
        </div>
    )
}

export default UserAccount;