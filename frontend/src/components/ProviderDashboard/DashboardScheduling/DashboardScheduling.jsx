import './DashboardScheduling.css'
import VendorAuthorization from './googleCalendar/VendorAuthorization/VendorAuthorization';

const DashboardScheduling = ({vendor}) => {
    return (
        <div className="dashboard-scheduling">
            <VendorAuthorization vendor={vendor}/>
        </div>
    )
}

export default DashboardScheduling;