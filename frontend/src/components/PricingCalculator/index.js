import { useState } from 'react';
import CalculatorResults from './CalculatorResults';
import './PricingCalculator.css'
import Selector from '../formComponents/Selector';
import RadioButton from '../formComponents/RadioButton';

const PricingCalculator = ({basePrice, pricingOpen, inputs, formula}) => {
    const [recurringOn, setRecurringOn] = useState(false);
    const [inputValues, setInputValues] = useState({});
    const inputFloats = Object.values(inputValues).map(val => parseFloat(val))
    console.log(inputs)
    let calculatedPrice = basePrice
    if(inputs !== undefined && inputFloats.length === Object.keys(inputs).length && inputFloats.every(val => val !== NaN)){
        let chars = formula.split('')
        let marker = false
        let parsedFormula = chars.map((char) => {
            if(marker){
                marker = false
                return parseFloat(inputValues[char])
            }else if(char === '#'){
                marker = true
                return ''
            }else if(char === 'x'){
                return basePrice
            }else{
                return char
            }
        })
        calculatedPrice = eval(parsedFormula.join(""))
    }else{
        calculatedPrice = basePrice;
    }

    const inputTypeKey = {
        radio: RadioButton,
        select: Selector,
    }

    const toggleRecurring = () =>{
        setRecurringOn(!recurringOn)
    }

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
                title={input?.name} 
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
                <div className="subtotal">${Math.round(calculatedPrice)}</div>
                <div className="calculator-main">
                    <form>
                        {inputs && Object.values(inputs).map(input => {
                            return renderInput(input)
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
                    <RadioButton options={[{name: "Once a Year", value: 1},{name: "Twice a Year", value: 2}, {name:"4 Times a Year", value: 3}]}/>
                    <Selector name="test" title="Clean Type" options={{1:{name:"Outside Only"},2:{name:"Inside and Out"}, 3:{name:"Alternating Outside Only / Inside and Out (Most Popular)"}}}/>
                </div>
                <CalculatorResults price={calculatedPrice?.toFixed(2)} duration={(calculatedPrice/35).toFixed(1)}/>
                <button className="accept-button">Continue - ${calculatedPrice?.toFixed(2)}</button>
            </div>
        </div>
    )
}

export default PricingCalculator;