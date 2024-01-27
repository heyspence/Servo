import { format, parseISO } from 'date-fns';
import './ProviderSummary.css'
import { useDispatch } from 'react-redux';
import { toggleCart, updateCartItem } from '../../store/cart';

const ProviderSummary = ({summaryOpen, cartItem, vendor, onContinue, onCheckout}) => {
    const dispatch = useDispatch();
    let isMobile = window.innerWidth < 700;

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
            return isMobile
            ? format(parseISO(cartItem?.appointmentAt), "MMM do @ h:mm")
            : format(parseISO(cartItem?.appointmentAt), "EEEE, MMMM do @ h:mmaaa");
        }else{
            return "--"
        }
    }

    return (
        <div className={`summary ${summaryOpen ? '' : 'minimize'}`}>
            <div className="summary-left">
                <h3>Summary</h3>
                <div className="summary-left-body">
                    <p>Service: {categoryMap[vendor?.category]}</p>
                    <p>Provider: {vendor?.name}</p>
                    <br/>
                    <p>{formattedDate()}</p>
                    <p>Duration: ~1 Hour 30 Minutes</p>
                    <br/>
                    <p>Options: {cartItem?.options}</p>
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
                        <p>${cartItem?.price.toFixed(2)}</p>
                    </div>
                </div>
                <div className="summary-action-buttons">
                    <button className="secondary-summary-action-button" onClick={() => onContinue({bypass: true})}>Add to Cart</button>
                    <button className="summary-action-button" onClick={onCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default ProviderSummary;