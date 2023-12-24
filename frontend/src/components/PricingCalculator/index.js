import { useState } from 'react';
import CalculatorResults from './CalculatorResults';
import './PricingCalculator.css'
import Selector from '../formComponents/Selector';
import RadioButton from '../formComponents/RadioButton';

const PricingCalculator = ({pricingOpen}) => {
    const options = [1,2,3]
    const [recurringOn, setRecurringOn] = useState(false);

    const toggleRecurring = () =>{
        setRecurringOn(!recurringOn)
    }

    return (
        <div className={`pricing-calculator ${pricingOpen ? '' :  'minimize'}`}>
            <div className="calculator-left">
                <h3>Instant Pricing</h3>
                <div className="subtotal">$50</div>
                <div className="calculator-main">
                    <form>
                        <Selector name="floors" title="Floors" options={options}/>
                        <Selector name="people" title="People" options={options}/>
                        <Selector name="sprinklers" title="Sprinklers" options={options}/>
                        <Selector name="other" title="Other" options={options}/>
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
                    <Selector name="test" title="Clean Type" options={["Outside Only", "Inside and Out", "Alternating Outside Only / Inside and Out (Most Popular)"]}/>
                </div>
                <CalculatorResults price={50} duration={1.5}/>
                <button className="accept-button">Continue - $42.50</button>
            </div>
        </div>
    )
}

export default PricingCalculator;