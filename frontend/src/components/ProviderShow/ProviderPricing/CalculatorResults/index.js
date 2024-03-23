import { formatDuration } from '../../../../util/formatting';
import './CalculatorResults.css'

const CalculatorResults = ({price, duration}) => {
    const formattedDuration = formatDuration(duration)
    return (
        <>
            <div className="calculator-results">
                <div className="calculated-price">
                    <h3>Subtotal</h3>
                    <p>${price}</p>
                </div>
                <div className="vertical-line" />
                <div className="calculated-duration">
                    <h3>Duration</h3>
                    <p>{formattedDuration}</p>
                </div>
            </div>
        </>
    )
}

export default CalculatorResults;