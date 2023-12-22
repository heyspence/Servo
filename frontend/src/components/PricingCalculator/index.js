import CalculatorResults from './CalculatorResults';
import './PricingCalculator.css'
import Selector from './Selector';

const PricingCalculator = ({pricingOpen}) => {
    const options = [1,2,3]

    return (
        <div className={`pricing-calculator ${pricingOpen ? '' :  'minimize'}`}>
            <div className="calculator-left">
                <h3>Instant Pricing</h3>
                <div className="calculator-main">
                    <form>
                        <Selector name="floors" title="Floors" options={options}/>
                        <Selector name="People" title="People" options={options}/>
                        <Selector name="Sprinklers" title="Sprinklers" options={options}/>
                    </form>
                </div>
            </div>
            <div className="calculator-right">
                <CalculatorResults price={50} duration={1.5}/>
                <button className="accept-button">Accept</button>
            </div>
        </div>
    )
}

export default PricingCalculator;