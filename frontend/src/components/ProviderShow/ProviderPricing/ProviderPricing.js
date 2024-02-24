import { useEffect, useState } from 'react';
import './ProviderPricing.css'
import Selector from '../../formComponents/Selector';
import RadioButton from '../../formComponents/RadioButton';
import RangeSlider from '../../formComponents/RangeSlider';
// import Checkbox from '../../formComponents/Checkbox';
import { createBooking, updateBooking } from '../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';

const ProviderPricing = ({pricingOpen, vendor, onContinue, booking}) => {
    const dispatch = useDispatch();
    const basePrice = vendor?.minPrice
    const formula = vendor?.pricingFormula ? vendor.pricingFormula : "x";
    const inputs = vendor?.pricingInputs
    const [recurringOn, setRecurringOn] = useState(false);
    const [inputValues, setInputValues] = useState({});
    // const [checkboxValues, setCheckboxValues] = useState({});
    const [calculatedPrice, setCalculatedPrice] = useState(basePrice);
    const inputFloats = Object.values(inputValues).map(val => parseFloat(val));
    const currentUserId = useSelector(state => state.session.user?.id)

    useEffect(()=>{
        if(inputs && inputFloats.every(val => val !== NaN)){
            let parsedFormula = formula.replace(/#(\d+)/g, (match, number) => {
                return inputValues[number] || '1';
            });
        
            // Replace 'x' with basePrice
            parsedFormula = parsedFormula.replace(/x/g, basePrice.toString());
        
            try {
                let finalPrice = eval(parsedFormula);
                setCalculatedPrice(finalPrice < basePrice ? basePrice : finalPrice);
            } catch (e) {
                console.error("Error evaluating formula:", e);
            }   
        }
    },[inputValues, formula, vendor])

    const inputTypeKey = {
        radio: RadioButton,
        select: Selector,
        range: RangeSlider
    }

    // Used to calculate the price difference for additional items like screen cleaning
    // useEffect(()=> {
    //     if(inputs){
    //         const newCheckboxValues = {}
    //         Object.values(inputs).forEach(input => {
    //             if(input.inputType === 'checkbox'){
    //                     newCheckboxValues[input.id] = Object.values(input.options)[0].value
    //             }
    //         })
    //         setCheckboxValues(newCheckboxValues)
    //     }
    // },[inputs])

    const toggleRecurring = () =>{
        setRecurringOn(!recurringOn)
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

    const handleContinueClick = () => {
        let bookingData = {
            userId: currentUserId,
            addressId: 1,
            optionsSnapshot: JSON.stringify(inputValues),
            price: calculatedPrice,
            vendorId: vendor.id,
            status: "priced"
        }
        let bookingObject = {
            booking: bookingData
        }
        if(booking){
            bookingObject.booking.id = booking.id
            dispatch(updateBooking(bookingObject))
        }else{
            dispatch(createBooking(bookingObject))
        }
        onContinue({bypass: true})
    }

    return (
        <div className={`pricing-calculator ${pricingOpen ? '' :  'minimize'}`}>
            <div className="calculator-left">
                <h3>Instant Pricing</h3>
                <div className="subtotal">${calculatedPrice?.toFixed(2)}</div>
                <div className="calculator-main">
                    <form>
                        {inputs && Object.values(inputs).map(input => {
                            if(!input?.recurring){
                                return renderInput(input)
                            }
                        })}
                    </form>
                </div>
            </div>
            <div className="calculator-right">
                <div className="recurring-section-header">
                    <h3>Recurring</h3>
                    <div onClick={toggleRecurring} className="recurring-toggle-background">
                        <div className={`recurring-toggle-circle ${recurringOn ? 'recurring-circle-active' : ''}`}>
                        </div>
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
                {/* <CalculatorResults price={calculatedPrice?.toFixed(2)} duration={(calculatedPrice/35).toFixed(1)}/> */}
                <button className="accept-button" onClick={handleContinueClick}>Continue - ${calculatedPrice?.toFixed(2)}</button>
            </div>
        </div>
    )
}

export default ProviderPricing;