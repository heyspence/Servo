import './CalculatorResults.css'

const CalculatorResults = ({price, duration}) => {
    return (
        <div className="calculator-results">
            <div className="calculated-price">
                <h3>Total Price</h3>
                <p>${price}</p>
            </div>
            <div className="calculated-duration">
                <h3>Duration</h3>
                <p>~{duration} Hrs</p>
            </div>
        </div>
    )
}

export default CalculatorResults;