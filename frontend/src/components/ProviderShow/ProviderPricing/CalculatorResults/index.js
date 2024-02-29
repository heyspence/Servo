import './CalculatorResults.css'

const CalculatorResults = ({price, duration}) => {
    return (
        <>
            <div className="calculator-results">
                <div className="calculated-price">
                    <h4>Subtotal</h4>
                    <p>${price}</p>
                </div>
                <div className="vertical-line" />
                <div className="calculated-duration">
                    <h4>Duration</h4>
                    <p>~{duration} Hrs</p>
                </div>
            </div>
        </>
    )
}

export default CalculatorResults;