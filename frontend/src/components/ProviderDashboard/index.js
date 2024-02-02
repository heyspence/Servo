import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import DashboardScheduling from './DashboardScheduling/DashboardScheduling';
import DashboardPricing from './DashboardPricing/DashboardPricing';
import DashboardSupport from './DashboardSupport/DashboardSupport';
import DashboardGeneral from './DashboardGeneral/DashboardGeneral';
import './ProviderDashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchVendor } from '../store/vendor';
import DashboardPromotions from './DashboardPromotions/DashboardPromotions';
import { isLoggedIn } from '../store/session';

const ProviderDashboard = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [currentTab, setCurrentTab] = useState('Scheduling')
    const {vendor, currentUser, userLoggedIn} = useSelector(state => ({
            vendor: state.vendors[id],
            currentUser: state.session.user,
            userLoggedIn: isLoggedIn(state)
        })
    );

    useEffect(()=>{
        if(currentUser?.vendorId === parseInt(id) && userLoggedIn){
            dispatch(fetchVendor(id))
        }else{
            history.push('/')
        }
    },[dispatch, history, userLoggedIn])

    const handleTabClick = name => {
        setCurrentTab(name)
    }

    const renderActiveComponent = () => {
        switch(currentTab){
            case('Scheduling'):
                return <DashboardScheduling vendor={vendor} />
            case('Pricing'):
                return <DashboardPricing />
            case ('Promotions'):
                return <DashboardPromotions />
            case('Support'):
                return <DashboardSupport />
            case('General'):
                return <DashboardGeneral vendor={vendor}/>
        }
    }

    return (
        <div className="provider-dashboard">
            <div className="provider-dashboard-container">
                <ul className="dashboard-tabs">
                    <li className={currentTab === 'Scheduling' ? 'active' : ''} onClick={()=>setCurrentTab('Scheduling')}>Scheduling</li>
                    <li className={currentTab === 'Promotions' ? 'active' : ''} onClick={()=>setCurrentTab('Promotions')}>Promotions</li>
                    <li className={currentTab === 'Pricing' ? 'active' : ''} onClick={()=>setCurrentTab('Pricing')}>Pricing</li>
                    <li className={currentTab === 'General' ? 'active' : ''} onClick={()=>setCurrentTab('General')}>General</li>
                    <li className={`support-tab ${currentTab === 'Support' ? 'active' : ''}`} onClick={()=>setCurrentTab('Support')}>Support</li>
                </ul>
                {renderActiveComponent()}
                <div className="servo-documentation">
                    <a>Terms of Service</a>
                    <span> | </span>
                    <a>Privacy Policy</a>
                </div>
            </div>
        </div>
    )
}

export default ProviderDashboard;