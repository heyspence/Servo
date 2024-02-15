import { useState } from 'react';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import './PaymentGateway.css';
import { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../../util/stripe/stripeClient';
import csrfFetch from '../../store/csrf';

const PaymentGateway = ({cartItem, vendorId}) => {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        csrfFetch("/api/orders/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItem }),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
                </Elements>
            )}
        </>
    );
};

export default PaymentGateway;