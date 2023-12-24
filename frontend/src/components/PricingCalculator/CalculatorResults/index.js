import './CalculatorResults.css'

const CalculatorResults = ({price, duration}) => {
    return (
        <>
            <div className="calculator-results">
                <div className="calculated-price">
                    <h3>Subtotal</h3>
                    <p>${price}</p>
                </div>
                <div className="calculated-duration">
                    <h3>Duration</h3>
                    <p>~{duration} Hrs</p>
                </div>
            </div>
            {/* <div className="discounts">
                <p>-$7.50</p>
            </div> */}
            
        </>
    )
}

export default CalculatorResults;