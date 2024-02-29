import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../../store/bookings';

const CheckoutForm = ({price, booking, onStatusChange}) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
        return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
        return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        onStatusChange(paymentIntent.status)
        switch (paymentIntent.status) {
            case "succeeded":
            setMessage("Payment success!");
            break;
            case "processing":
            setMessage("Your payment is processing.");
            break;
            case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
            default:
            setMessage("Something went wrong.");
            break;
        }
        });
    }, [stripe, onStatusChange]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const redirectUrl = `${process.env.REACT_APP_STRIPE_REDIRECT_URL}/vendors/${booking.vendorId}?open_payment_gateway=true`

        if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: redirectUrl,
        }, redirect: 'if_required'
        });

        if (paymentIntent) {
            // Check paymentIntent status
            const { status } = paymentIntent;
            onStatusChange(status);
            if (status === 'succeeded') {
                const bookingData = { booking:{
                    ...booking,
                    status: "paid"
                }}
                dispatch(createOrder(bookingData)).then(()=>{
                    // dispatch(deletebookings(1))
                })
                onStatusChange('succeeded') // Your success logic here
            }
        }

        if (error?.type === "card_error" || error?.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <div className="checkout-form">
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
        </div>
    );
}

export default CheckoutForm;