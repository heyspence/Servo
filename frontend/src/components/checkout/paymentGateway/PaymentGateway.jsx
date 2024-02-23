import { useState } from 'react';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import './PaymentGateway.css';
import { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../../util/stripe/stripeClient';
import csrfFetch from '../../store/csrf';
import PaymentConfirmation from '../PaymentConfirmation'

const PaymentGateway = ({cartItem}) => {
    const [clientSecret, setClientSecret] = useState("");
    const [price, setPrice] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        csrfFetch("/api/orders/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItem }),
        })
        .then((res) => res.json())
        .then((data) => {
            setClientSecret(data.clientSecret);
            setPrice(data.price);
        });
    }, []);

    const handleStatusUpdate = status => {
        setPaymentStatus(status)
    }

    const appearance = {
        theme: 'flat',

        variables: {
            colorPrimary: 'var(--primary-red)',
            colorBackground: 'var(--secondary-white)',
            colorText: 'var(--primary-red)',
            colorDanger: '#df1b41',
            fontFamily: 'Ideal Sans, system-ui, sans-serif',
            spacingUnit: '2px',
            borderRadius: '4px'
        }
    };
    const options = {
        clientSecret,
        appearance
    };

    return (
        <>
            {paymentStatus === 'succeeded' ? <PaymentConfirmation /> :
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm price={price} cartItem={cartItem} onStatusChange={handleStatusUpdate} />
                    </Elements>
                ) : <div className='checkout-form'>
                        <h2>Loading...</h2>
                    </div>}
        </>
    );
};

export default PaymentGateway;