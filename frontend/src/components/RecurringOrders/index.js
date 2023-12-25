import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './RecurringOrders.css'
import { isLoggedIn } from '../store/session';
import { useSelector } from 'react-redux';
import {ReactComponent as RightCheveron} from '../../assets/svg/chevron_right_FILL0_wght400_GRAD0_opsz24.svg';
import {ReactComponent as AddCircle} from '../../assets/svg/add_circle_FILL0_wght400_GRAD0_opsz24.svg';
import {ReactComponent as MinusCircle} from '../../assets/svg/do_not_disturb_on_FILL0_wght400_GRAD0_opsz24.svg'

const RecurringOrders = () => {
    const userLoggedIn = useSelector(isLoggedIn)
    const history = useHistory();

    if(!userLoggedIn){
        history.push('/home')
    }

    const recurringServices = [
        {type: "pest_control", frequency: 4, vendor: "Dave's Pest Control", vendorId: 4, nextAppointment: 153, price: 45.20},
        {type: "window_cleaning", frequency: 3, vendor: "Ease Window Cleaning", vendorId: 1, nextAppointment: 153, price: 122.00},
        {type: "house_cleaning", frequency: 1, vendor: "Lily Maid Cleaning", vendorId: 5, nextAppointment: 75, price: 75.21},
        {type: "carpet_cleaning", frequency: 12, vendor: "JDog Carpet Cleaning", vendorId: 2, nextAppointment: 320, price: 320.50}
    ]

    const servicesData = {
        window_cleaning: { name: "Window Cleaning", color: "red" },
        house_cleaning: { name: "House Cleaning", color: "var(--secondary-green)" },
        pest_control: { name: "Pest Control", color: "var(--primary-red)" },
        carpet_cleaning: { name: "Carpet Cleaning", color: "var(--primary-yellow)" },
        garbage_can_cleaning: { name: "Garbage Can Cleaning", color: "purple" },
        car_detailing: { name: "Auto Detailing", color: "orange" }
    };

    const handleVendorClick = (vendorId) => {
        history.push(`/vendors/${vendorId}`)
    }

    return (
        <div className="recurring-orders">
            <div className="recurring-orders-container">
                <h1>Your Recurring Services</h1>
                {recurringServices && recurringServices.map((service, index) => {
                    const serviceData = servicesData[service.type];
                    return (
                        <div className="recurring-service" key={index}>
                            <div className="recurring-vendor-info align-first">
                                <h2>{serviceData?.name}</h2>
                                <h3 onClick={() => handleVendorClick(service?.vendorId)}>{service?.vendor} <span><RightCheveron className="right-cheveron"/></span></h3>
                            </div>
                            <div className="align-third">
                                <AddCircle className="add-circle" />
                                <MinusCircle className="minus-circle" />
                                <p className="frequency-top">{12 / service?.frequency}x</p>
                                <p>per year</p>
                            </div>
                            <p className="align-fourth">${service?.price.toFixed(2)} / Visit</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default RecurringOrders;