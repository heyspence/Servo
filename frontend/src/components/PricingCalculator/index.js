import { useState } from 'react';
import CalculatorResults from './CalculatorResults';
import './PricingCalculator.css'
import Selector from '../formComponents/Selector';
import RadioButton from '../formComponents/RadioButton';

const PricingCalculator = ({basePrice, pricingOpen, inputs, formula}) => {
    const [recurringOn, setRecurringOn] = useState(false);
    const [inputValues, setInputValues] = useState({});
    console.log(inputValues)
    const inputFloats = Object.values(inputValues).map(val => parseFloat(val))
    let calculatedPrice = basePrice
    if(inputs !== undefined && inputFloats.every(val => val !== NaN)){
        let chars = formula.split('')
        let marker = false

        // Formula comes in as "x+(#3*#4)" format and gets parsed in the following lines of code. 
        // Note: Formula may or may not contain spaces! Hence the ternary logic on line 27.

        // An "x" in the formula represents the basePrice.
        // A "#" in the formula means it is refrerencing one of the user-inputed values, "#3" is referencing the input with an id of 3.

        // Values from user inputs are stored in inputValues useState variable as key-value pairs.
        // Note: Logic has been added to allow the price to be rendered before all the inputs have been recieved 
        // by converting pending inputs to either a 0 or 1.

        let parsedFormula = chars.map((char, index) => {
            if(marker){
                marker = false
                let input;
                if(!inputValues[char]){
                    let prevChar = ["+","-","/","*"].includes(chars[index - 3]) ? chars[index - 3] : chars[index - 2]
                    if(["+", "-"].includes(prevChar)){
                        input = "0"
                    }else if(["*", "/"].includes(prevChar)){
                        input = "1"
                    }
                }else{
                    input = inputValues[char]
                }
                return parseFloat(input)
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