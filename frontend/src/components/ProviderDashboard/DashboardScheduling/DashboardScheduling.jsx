import './DashboardScheduling.css'
import VendorAuthorization from './googleCalendar/VendorAuthorization/VendorAuthorization';
import { ReactComponent as ToolTip } from '../../../assets/svg/ToolTip.svg'

const DashboardScheduling = ({vendor}) => {
    return (
        <div className="dashboard-scheduling">
            <div className="calendar-header-container">
                <h3>Google Calendar Integration</h3>
                <ToolTip style={{transform: 'scale(0.75)'}}/>
            </div>
            <VendorAuthorization vendor={vendor}/>
        </div>
    )
}

export default DashboardScheduling;