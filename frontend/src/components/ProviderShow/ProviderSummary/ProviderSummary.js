import { format, parseISO } from 'date-fns';
import './ProviderSummary.css'
import { useEffect, useState } from 'react';
import { formatDurationLong } from '../../../util/formatting';

const ProviderSummary = ({summaryOpen, booking, vendor, onCheckout, serviceCharge}) => {
    const options = booking?.optionsSnapshot ? JSON.parse(booking.optionsSnapshot) : {}

    const categoryMap = {
        window_cleaning: "Window Cleaning",
        house_cleaning: "House Cleaning",
        pest_control: "Pest Control",
        carpet_cleaning: "Carpet Cleaning",
        garbage_can_cleaning: "Garbage Can Cleaning",
        car_detailing: "Auto Detailing"
    }

    let formattedDate = () =>{
        if(booking?.appointmentAt){
            return format(parseISO(booking?.appointmentAt), "MMM do @ h:mmaaa")
        }
    }

    return (
        <div className={`summary ${summaryOpen ? '' : 'minimize'}`}>
            <div className="summary-left">
                <h3>Summary</h3>
                <div className="summary-left-body">
                    <div className="pricing-summary-item-container">
                        <p>Provider</p>
                        <p>{vendor?.name}</p>
                    </div>
                    <div className="pricing-summary-item-container">
                        <p>Service</p>
                        <p>{categoryMap[vendor?.category]}</p>
                    </div>
                    {options && Object.entries(options).map((entry, index) => (
                        <div className="pricing-summary-item-container" key={index}>
                            <p>{entry[0]}</p>
                            <p>{entry[1]}</p>
                        </div>
                    ))}
                    <hr/>
                    <div className="pricing-summary-item-container">
                        <p>Appointment</p>
                        <p>{formattedDate()}</p>
                    </div>
                    <div className="pricing-summary-item-container">
                        <p>Estimated Duration</p>
                        <p>{formatDurationLong((booking?.price / vendor?.priceToDurationRate).toFixed(1))}</p>
                    </div>
                </div>
            </div>
            <div className="summary-right">
                <div className="summary-right-header">
                    <h3>Billing</h3>
                </div>
                <div className="summary-right-body">
                    <div className="pricing-summary-item-container">
                        <p>Subtotal</p>
                        <p>${booking?.price.toFixed(2)}</p>
                    </div>
                    <div className="pricing-summary-item-container">
                        <p>Service Charge</p>
                        <p>${serviceCharge}</p>
                    </div>
                    <hr/>
                    <div className="pricing-summary-item-container">
                        <p>Total</p>
                        <p>${(booking?.price + parseFloat(serviceCharge)).toFixed(2)}</p>
                    </div>
                </div>
                <div className="summary-action-buttons">
                    <button className="secondary-summary-action-button" onClick={onCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default ProviderSummary;