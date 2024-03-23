import { useState } from 'react';
import './PaymentConfirmation.css'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RadioButton from '../formComponents/RadioButton';
import Selector from '../formComponents/Selector';
import RangeSlider from '../formComponents/RangeSlider';


const PaymentConfirmation = () => {
    const {id} = useParams();
    const vendorId = parseInt(id)
    const vendor = useSelector(state => state.vendors[vendorId])
    const inputs = vendor?.pricingInputs
    const [recurringOn, setRecurringOn] = useState(false);
    const [inputValues, setInputValues] = useState({});

    const toggleRecurring = () =>{
        setRecurringOn(!recurringOn)
    }

    const inputTypeKey = {
        radio: RadioButton,
        select: Selector,
        range: RangeSlider
    }

    const renderInput = (input) => {
        const InputComponent = inputTypeKey[input.inputType]

        if(!InputComponent){
            return <p>Unknown InputType</p>
        }else{
            const handleInputChange = (input, value) => {
                setInputValues(prevValues => ({
                    ...prevValues,
                    [input.id]: value
                }))
            }
            return <InputComponent 
                name={input?.name}
                options={input?.pricingInputOptions} 
                key={input?.id} 
                onChange={(value) => handleInputChange(input, value)}
            />
        }
    }

    return (
        <div className="payment-confirmation">
            <h2>Booking Confirmation</h2>
            <p>Your Service Has Been Booked!</p>

            <br/>
            <div className="recurring-options-container">
                <div className="recurring-section-header">
                    <h3>Set Up Recurring Reminders</h3>
                    <div onClick={toggleRecurring} className="recurring-toggle-background">
                        <div className={`recurring-toggle-circle ${recurringOn ? 'recurring-circle-active' : ''}`} />
                    </div>
                </div>
                <div className="recurring-options">
                    <form className={`${recurringOn ? '' : 'minimize'}`}>
                        {inputs && Object.values(inputs).map(input => {
                            if(input?.recurring){
                                return renderInput(input)
                            }
                        })}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PaymentConfirmation;