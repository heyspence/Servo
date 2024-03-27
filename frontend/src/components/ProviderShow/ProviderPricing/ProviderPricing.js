import { useEffect, useState } from 'react';
import './ProviderPricing.css'
import Selector from '../../formComponents/Selector';
import RadioButton from '../../formComponents/RadioButton';
import RangeSlider from '../../formComponents/RangeSlider';
// import Checkbox from '../../formComponents/Checkbox';
import { createBooking, updateBooking } from '../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from '../../formComponents/TextArea/TextArea';
import CalculatorResults from './CalculatorResults/index'

const ProviderPricing = ({pricingOpen, vendor, onContinue, booking}) => {
    const dispatch = useDispatch();
    const basePrice = vendor?.minPrice
    const formula = vendor?.pricingFormula ? vendor.pricingFormula : "x";
    const inputs = vendor?.pricingInputs
    const [parsedInputValues, setParsedInputValues] = useState({})
    const [inputValues, setInputValues] = useState({}); // Use this for saving user_inputs on the backend as part of the handleContinueClick action
    // const [checkboxValues, setCheckboxValues] = useState({});
    const [calculatedPrice, setCalculatedPrice] = useState(basePrice);
    const inputFloats = Object.values(inputValues).map(val => parseFloat(val));
    const currentUserId = useSelector(state => state.session.user?.id)
    const priceToDurationRate = vendor?.priceToDurationRate ? vendor.priceToDurationRate : 35
    const duration = ((calculatedPrice/priceToDurationRate)*60).toFixed(0)

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

    // Used to calculate the price difference for add-on items like screen cleaning
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

    const handleInputChange = (input, parsedOption) => {
        if (input && input.id && parsedOption && parsedOption.label !== undefined && parsedOption.name !== undefined) {
            // Keep track of the user selected input value to use as prefill data in the future
            setInputValues(prevValues => ({
                ...prevValues,
                [input.id]: parsedOption.value
            }))

            // Save a parsed version to display back to the user at summary
            setParsedInputValues(prevValues => ({
                ...prevValues, 
                [parsedOption.label]: parsedOption.name
            }))
        }
    }

    const renderInput = (input) => {
        const InputComponent = inputTypeKey[input.inputType]

        if(!InputComponent){
            return <p>Unknown InputType</p>
        }else{
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
            optionsSnapshot: JSON.stringify(parsedInputValues),
            price: calculatedPrice,
            vendorId: vendor.id,
            status: "priced",
            duration
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
                {/* <div className="subtotal">${calculatedPrice?.toFixed(2)}</div> */}
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
                <div style={{display: 'flex', flexDirection:'column', alignItems:'center', textAlign:'center'}}>
                    <CalculatorResults price={calculatedPrice?.toFixed(2)} duration={(calculatedPrice/priceToDurationRate).toFixed(1)}/>
                    {vendor?.category === 'garbage_can_cleaning' ? '' : <p style={{color: 'var(--primary-gray)', fontSize:'13px', maxWidth: '275px'}}>The provided time is an estimate, additional technicians may decrease time significantly.</p>}
                    <button className="accept-button" onClick={handleContinueClick}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default ProviderPricing;