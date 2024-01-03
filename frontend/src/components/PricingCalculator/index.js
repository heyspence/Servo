import { useState } from 'react';
import CalculatorResults from './CalculatorResults';
import './PricingCalculator.css'
import Selector from '../formComponents/Selector';
import RadioButton from '../formComponents/RadioButton';

const PricingCalculator = ({pricingOpen, inputs, formula}) => {
    const options = [1,2,3]
    const [recurringOn, setRecurringOn] = useState(false);
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
            return <InputComponent name={input?.name} title={input?.name} options={input?.options} key={input?.id}/>
        }
    }

    return (
        <div className={`pricing-calculator ${pricingOpen ? '' :  'minimize'}`}>
            <div className="calculator-left">
                <h3>Instant Pricing</h3>
                <div className="subtotal">$50</div>
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
                <CalculatorResults price={50} duration={1.5}/>
                <button className="accept-button">Continue - $42.50</button>
            </div>
        </div>
    )
}

export default PricingCalculator;