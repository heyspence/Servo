import { useState, useEffect } from 'react';
import './PaymentConfirmation.css'
import { useStripe } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { createOrder } from '../store/orders';
import { deleteCartItems } from '../store/cart';


const PaymentConfirmation = ({message}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const onSuccess = () => {
            // console.log(cartItem)
            const order = { order:{
                userId: 1,
                vendorId: 4,
                total: 10
            }}
            dispatch(createOrder(order)).then(()=>{
                // dispatch(deleteCartItems(1))
            })
        }
        onSuccess();
    }, [])
    // const [message, setMessage] = useState(null);

    // const stripe = useStripe();

    // const onSuccess = () => {
    //     // console.log(cartItem)
    //     // const order = { order:{
    //     //     userId: user.id,
    //     //     vendorId: cartVendor.id,
    //     //     total: totalPrice
    //     // }}
    //     // dispatch(createOrder(order))
    // }

    // useEffect(() => {
    //     if (!stripe) {
    //     return;
    //     }

    //     const clientSecret = new URLSearchParams(window.location.search).get(
    //         "payment_intent_client_secret"
    //     );

    //     if (!clientSecret) {
    //     return;
    //     }

    //     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
    //     switch (paymentIntent.status) {
    //         case "succeeded":
    //         setMessage("Payment succeeded!");
    //         onSuccess();
    //         debugger
    //         break;
    //         case "processing":
    //         setMessage("Your payment is processing.");
    //         break;
    //         case "requires_payment_method":
    //         setMessage("Your payment was not successful, please try again.");
    //         break;
    //         default:
    //         setMessage("Something went wrong.");
    //         break;
    //     }
    //     });
    // }, [stripe]);

    return (
        <div className="payment-confirmation">
            <h1>Hello from payment confirmation</h1>
            <p>{message}</p>
        </div>
    )
}

export default PaymentConfirmation;