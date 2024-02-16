import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css'
import { useEffect, useState } from 'react';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

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
        switch (paymentIntent.status) {
            case "succeeded":
            setMessage("Payment succeeded!");
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
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:3002/",
        },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
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
                <span><img src="https://spencerheywood.com/images/servo/icons/icons-07.png" style={{height:'43px', margin: '-3px -2px 0 0'}}/></span>
                Complete Your Booking
            </h2>
            <form id="payment-form" onSubmit={handleSubmit}>

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <div className="servo-certified-icon">
                <hr/>
                <img src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-09.png"
                    style={{height: '50px', marginRight: '-5px'}}
                />
                <img src="https://spencerheywood.com/images/servo/logos_and_icons/logo_blue_yellow.png" 
                    style={{height: '44px'}}
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
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* <div className="servo-certified-icon">
                <img src="https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-09.png"
                    style={{height: '52px', marginRight: '-5px'}}
                />
                <img src="https://spencerheywood.com/images/servo/logos_and_icons/logo_blue_yellow.png" 
                    style={{height: '42px'}}
                />
            </div> */}
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}

export default CheckoutForm;