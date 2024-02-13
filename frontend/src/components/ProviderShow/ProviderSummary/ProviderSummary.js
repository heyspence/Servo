import { format, parseISO } from 'date-fns';
import './ProviderSummary.css'
import { useEffect, useState } from 'react';

const ProviderSummary = ({summaryOpen, cartItem, vendor, onCheckout}) => {
    const options = cartItem?.options ? JSON.parse(cartItem.options) : {}
    const serviceInputs = vendor?.services ? Object.values(vendor.services)[0].inputs : {}
    const [parsedOptions, setParsedOptions] = useState({})

    useEffect(()=>{
        let newParsedOptions = {}
        if(!!options && !!serviceInputs){
            for(let option in options){
                let key = serviceInputs[option]?.name
                let value = options[option]
                newParsedOptions[key] = value
            }
        }
        setParsedOptions(newParsedOptions)
    },[vendor, cartItem])

    const categoryMap = {
        window_cleaning: "Window Cleaning",
        house_cleaning: "House Cleaning",
        pest_control: "Pest Control",
        carpet_cleaning: "Carpet Cleaning",
        garbage_can_cleaning: "Garbage Can Cleaning",
        car_detailing: "Auto Detailing"
    }

    let formattedDate = () =>{
        if(cartItem?.appointmentAt){
            return format(parseISO(cartItem?.appointmentAt), "MMM do @ h:mm")
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
                    {parsedOptions && Object.entries(parsedOptions).map(entry => (
                        <div className="pricing-summary-item-container">
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
                        <p>Duration</p>
                        <p>~1 Hour 30 Minutes</p>
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
                        <p>${cartItem?.price.toFixed(2)}</p>
                    </div>
                    <div className="pricing-summary-item-container">
                        <p>Taxes & Fees</p>
                        <p>$1.85</p>
                    </div>
                    <div className="pricing-summary-item-container">
                        <p>Discounts</p>
                        <p>-$0.00</p>
                    </div>
                    <hr/>
                    <div className="pricing-summary-item-container">
                        <p>Total</p>
                        <p>${(cartItem?.price + 1.85).toFixed(2)}</p>
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