import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './UserAccount.css'
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../store/session';

const UserAccount = () => {
    const userLoggedIn = useSelector(isLoggedIn);
    const history = useHistory();

    if(!userLoggedIn){
        history.push('/')
    }

    return (
        <div className="user-account">
            <div className="">
                <h2>Hello from user account</h2>
            </div>
        </div>
    )
}

export default UserAccount;