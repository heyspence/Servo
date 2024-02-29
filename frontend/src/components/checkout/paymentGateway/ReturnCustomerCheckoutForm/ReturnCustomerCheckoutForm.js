import { useState } from "react"
import './ReturnCustomerCheckoutForm.css'

const ReturnCustomerCheckoutForm = ({paymentMethods, onAddPaymentMethod}) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].id)

    const cards = paymentMethods.map(method => (
        method.card
    ))



    return (
        <div className="return-customer-checkout-form" style={{display:'flex', flexDirection: 'column'}}>
            {/* <div className="checkout-form">
                <h2>
                    <span><img src="https://spencerheywood.com/images/servo/icons/icons-07.png" style={{height:'43px', margin: '-3px -2px 0 0'}} alt="Servo Checkbox Branded Icon"/></span>
                    Complete Your Booking
                </h2>
                <form id="payment-form" onSubmit={handleSubmit}>
                    <PaymentElement id="payment-element" options={paymentElementOptions} />
                    <p style={{fontSize: '12px', color: '#6d6e78', lineHeight: '18px', marginBottom: '20px'}}>Servo securely stores payment information for convenient checkout on future orders. Each transaction for purchased services will always require your explicit consent.</p>
                    <div className="servo-certified-icon">
                        <hr/>
                        <img src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-09.png"
                            style={{height: '50px', marginRight: '-5px'}}
                            alt="Servo Sheild Icon"
                        />
                        <img src="https://spencerheywood.com/images/servo/logos_and_icons/logo_blue_yellow.png" 
                            style={{height: '44px'}}
                            alt="Servo Certified Logo"
                        />
                        <hr/>
                    </div>
                    <button disabled={isLoading || !stripe || !elements} id="submit" style={{
                                                                                        minWidth: '325px', 
                                                                                        margin: '0 auto', 
                                                                                        backgroundColor: 'var(--primary-green)', 
                                                                                        display: 'block'
                                                                                    }}>
                        <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : `Pay $${price.toFixed(2)}`}
                        </span>
                    </button>
                    {message && <div id="payment-message">{message}</div>}
                </form>
            </div> */}
            <h2>
                <span><img src="https://spencerheywood.com/images/servo/icons/icons-07.png" style={{height:'43px', margin: '-3px -2px 0 0'}} alt="Servo Checkbox Branded Icon"/></span>
                Complete Your Booking
            </h2>
                {paymentMethods && paymentMethods.map(method => {
                    return (
                        <li key={method.id}>
                            <input checked={selectedPaymentMethod === method.id} type="radio" value={method.id} onChange={e => (e) => setSelectedPaymentMethod(e.target.value)}/>
                            <label>Exp: {method.card.exp_month}/{method.card.exp_year.toString().slice(2,4)} - {method.card.brand.charAt(0).toUpperCase() + method.card.brand.slice(1, method.card.brand.length)} ...{method.card.last4}</label>
                        </li>
                    )
                })}
            <button style={{width: "225px", backgroundColor: 'white', color: 'var(--primary-red)', textDecoration:'underline'}} onClick={onAddPaymentMethod}>Use New Payment Method</button>
        </div>
    )
}

export default ReturnCustomerCheckoutForm;