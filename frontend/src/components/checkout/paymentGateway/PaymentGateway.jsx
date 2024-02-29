import { useState } from 'react';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import './PaymentGateway.css';
import { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../../util/stripe/stripeClient';
import csrfFetch from '../../store/csrf';
import PaymentConfirmation from '../PaymentConfirmation'
import { useSelector } from 'react-redux';
import ReturnCustomerCheckoutForm from './ReturnCustomerCheckoutForm/ReturnCustomerCheckoutForm';

const PaymentGateway = ({booking}) => {
    const [clientSecret, setClientSecret] = useState("");
    const [price, setPrice] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState();
    const [loadingMessage, setLoadingMessage] = useState("Loading...");
    const [checkoutType, setCheckoutType] = useState('new')
    const [prevPaymentMethods, setPrevPaymentMethods] = useState([])
    const currentUser = useSelector(state => state.session.user)

    const getPaymentIntent = booking => {
        setLoadingMessage('Initializing...')
        csrfFetch("/api/orders/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ booking }),
        })
        .then((response) => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }else{
                return response.json();
            }
        })
        .then((data) => {
            setClientSecret(data.clientSecret);
            setPrice(data.price);
            setLoadingMessage('Success')
        })
        .catch(error => {
            console.error('Failed to initialize payment gateway:', error);
            setLoadingMessage('Error #1931: Unable to initialize payment gateway. Please contact spencer@bookservo.com to resolve this issue.');
        })
    }

    useEffect(() => {
        if(!currentUser.stripeCustomerId){
            getPaymentIntent(booking)
        }else{
            setLoadingMessage('Loading...')
            csrfFetch(`/api/user/${currentUser.id}/get-payment-methods`)
                .then(res => {
                    if(res.ok){
                        return res.json()
                    }else{
                        throw new Error('Network response was not ok')
                    }
                })
                .then(data => {
                    setLoadingMessage('Success')
                    if(data.data.length > 0){
                        setCheckoutType('return')
                        setPrevPaymentMethods(data.data)
                    }else{
                        getPaymentIntent(booking)
                    }
                })
                .catch(error => {
                    console.error('Failed to retrieve payment information:', error)
                    setLoadingMessage('Error #1932: Failed to retrieve payment information. Please contact spencer@bookservo.com to resolve this issue.')
                })
        }
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
        },
        labels: 'floating',
        rules:{
            '.Label--floating':{
                color: 'var(--secondary-white)'
            },
            '.Input': {
                borderRadius: '4px',
                margin: '7px 0',
                boxSizing: 'border-box',
                padding: '5px 10px'
            },
            '.TermsText':{
                color: 'transparent',
                fontSize: '0px'
            }
        }
    };
    const options = {
        clientSecret,
        appearance
    };

    return (
        <>
            {paymentStatus === 'succeeded' ? (
                <PaymentConfirmation /> 
                ) : checkoutType === 'return' ? 
                    <div className="checkout-form">
                        <ReturnCustomerCheckoutForm 
                            paymentMethods={prevPaymentMethods} 
                            price={price} 
                            booking={booking} 
                            onStatusChange={handleStatusUpdate} 
                            onAddPaymentMethod={()=>{
                                setCheckoutType('new')
                                getPaymentIntent(booking)
                        }}
                        />
                    </div>
                 : (clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm price={price} booking={booking} onStatusChange={handleStatusUpdate} />
                    </Elements>
                ) : (
                    <div className='checkout-form' style={{padding: "30px", display:'flex', justifyContent: 'center'}}>
                        {/* <span><img src="https://spencerheywood.com/images/servo/icons/icons-07.png" style={{height:'43px', margin: '-3px -2px 0 0'}} alt="Servo Checkbox Branded Icon"/></span> */}
                        <h2>{loadingMessage}</h2>
                    </div>
                ))}
        </>
    );
};

export default PaymentGateway;