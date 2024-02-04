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
import { useQueryParams } from '../../util/urlQueryParams';

const ProviderDashboard = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentTab = useQueryParams().tab || 'scheduling'
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
        history.push(`/vendors/${id}/dashboard?tab=${name.toLowerCase()}`)
    }

    const renderActiveComponent = () => {
        switch(currentTab){
            case('scheduling'):
                return <DashboardScheduling vendor={vendor} />
            case('pricing'):
                return <DashboardPricing />
            case ('romotions'):
                return <DashboardPromotions />
            case('support'):
                return <DashboardSupport />
            case('general'):
                return <DashboardGeneral vendor={vendor}/>
        }
    }

    return (
        <div className="provider-dashboard">
            <div className="provider-dashboard-container">
                <ul className="dashboard-tabs">
                    <li className={currentTab === 'scheduling' ? 'active' : ''} onClick={()=>handleTabClick('scheduling')}>Scheduling</li>
                    <li className={currentTab === 'promotions' ? 'active' : ''} onClick={()=>handleTabClick('promotions')}>Promotions</li>
                    <li className={currentTab === 'pricing' ? 'active' : ''} onClick={()=>handleTabClick('pricing')}>Pricing</li>
                    <li className={currentTab === 'general' ? 'active' : ''} onClick={()=>handleTabClick('general')}>General</li>
                    <li className={`support-tab ${currentTab === 'support' ? 'active' : ''}`} onClick={()=>handleTabClick('support')}>Support</li>
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