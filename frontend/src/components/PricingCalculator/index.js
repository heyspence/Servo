import './PricingCalculator.css'

const PricingCalculator = ({pricingOpen}) => {
    return (
        <div className={`pricing-calculator ${pricingOpen ? '' :  'minimize'}`}>
            <div className="calculator-left">
                <h2>Hello from calculator</h2>
            </div>
            <div className="calculator-right">

            </div>
        </div>
    )
}

export default PricingCalculator;