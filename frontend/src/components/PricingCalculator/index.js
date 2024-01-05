import { useEffect, useState } from 'react';
import CalculatorResults from './CalculatorResults';
import './PricingCalculator.css'
import Selector from '../formComponents/Selector';
import RadioButton from '../formComponents/RadioButton';
import RangeSlider from '../formComponents/RangeSlider';
import Checkbox from '../formComponents/Checkbox';

const PricingCalculator = ({basePrice, pricingOpen, inputs, formula}) => {
    const [recurringOn, setRecurringOn] = useState(false);
    const [inputValues, setInputValues] = useState({});
    const [checkboxValues, setCheckboxValues] = useState({});
    const inputFloats = Object.values(inputValues).map(val => parseFloat(val));
    const [calculatedPrice, setCalculatedPrice] = useState(basePrice)

    useEffect(()=>{
        if(inputs && inputFloats.every(val => val !== NaN)){
            let chars = formula.split('')
            let marker = false
            let parsedFormula = chars.map((char, index) => {
                if(marker){
                    marker = false
                    return parseFloat(inputValues[char] || 1)
                }else if(char === '#'){
                    marker = true
                    return ''
                }else if(char === 'x'){
                    return basePrice
                }else{
                    return char
                }
            })
            setCalculatedPrice(eval(parsedFormula.join("")))
        }
    },[inputs, inputValues])

    const inputTypeKey = {
        radio: RadioButton,
        select: Selector,
        range: RangeSlider,
        checkbox: Checkbox
    }

    const toggleRecurring = () =>{
        setRecurringOn(!recurringOn)
    }

    useEffect(()=> {
        if(inputs){
            const newCheckboxValues = {}
            Object.values(inputs).forEach(input => {
                if(input.inputType === 'checkbox'){
                        newCheckboxValues[input.id] = Object.values(input.options)[0].value
                }
            })
            setCheckboxValues(newCheckboxValues)
        }
    },[inputs])

    const renderInput = (input) => {
        const InputComponent = inputTypeKey[input.inputType]

        if(!InputComponent){
            return <p>Unknown InputType</p>
        }else{
            const handleInputChange = (id, value) => {
                setInputValues(prevValues => ({
                    ...prevValues,
                    [id]: value
                }))
            }
            return <InputComponent 
                name={input?.name}
                options={input?.options} 
                key={input?.id} 
                onChange={(value) => handleInputChange(input.id, value)}
            />
        }
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
                    <form>
                        {inputs && Object.values(inputs).map(input => {
                            if(input?.recurring){
                                return renderInput(input)
                            }
                        })}
                    </form>
                </div>
                <CalculatorResults price={calculatedPrice?.toFixed(2)} duration={(calculatedPrice/35).toFixed(1)}/>
                <button className="accept-button">Continue - ${calculatedPrice?.toFixed(2)}</button>
            </div>
        </div>
    )
}

export default PricingCalculator;