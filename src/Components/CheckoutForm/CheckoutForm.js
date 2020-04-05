// import React, { useState } from 'react';
// import {
//     CardElement,
//     useStripe,
//     useElements
// } from '@stripe/react-stripe-js';

// const CheckoutForm = (props) => {
//     const [paymentError, setPaymentError] = useState(null);
//     const [paymentFinished, setPaymentFinished] = useState(null)
//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card: elements.getElement(CardElement),
//         });
//         if (error) {
//             setPaymentError(error.message)
//             setPaymentFinished(null)
//         }else{
//             setPaymentFinished(paymentFinished)
//             const payment = {id:paymentMethod.id, last4: paymentMethod.card.last4}
//             props.handlePlaceOrder(payment)
//             setPaymentError(null)
//         }
        
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement />
//             <button type="submit" disabled={!stripe}>
//                 Pay
//             </button>
//             {
//                 paymentError && <p style={{color:'red'}}>{paymentError}</p>
//             }
//             {
//                 paymentFinished && <p style={{ color: 'green' }}>Payment Successful</p>
//             }
//         </form>
//     );
// };



import React, { useState } from 'react';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';

import { logEvent, Result, ErrorResult } from './util';
import './CheckoutForm.css';

const ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '18px',
            color: '#424770',
            letterSpacing: '0.025em',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

const CheckoutForm = (props) => {
    

    const elements = useElements();
    const stripe = useStripe();
    const [name, setName] = useState('');
    const [postal, setPostal] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);

        const payload = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name,
                address: {
                    postal_code: postal,
                },
            },
        });

        if (payload.error) {
            console.log('[error]', payload.error);
            setErrorMessage(payload.error.message);
            setPaymentMethod(null);
        } else {
            console.log('[PaymentMethod]', payload.paymentMethod);
            const payment = { id: payload.paymentMethod.id, last4: payload.paymentMethod.card.last4 }
            props.handlePlaceOrder(payment)
            setPaymentMethod(payload.paymentMethod);
            setErrorMessage(null);
        }
    };

    return (
        <form className="checkForm" onSubmit={handleSubmit}>
            <label className="checkLabel" htmlFor="name">Full Name</label>
            <input
                id="name"
                className="checkInput"
                required
                placeholder="Jenny Rosen"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <label className="checkLabel" htmlFor="cardNumber">Card Number</label>
            <CardNumberElement
                id="cardNumber"
                onBlur={logEvent('blur')}
                onChange={logEvent('change')}
                onFocus={logEvent('focus')}
                onReady={logEvent('ready')}
                options={ELEMENT_OPTIONS}
            />
            <label className="checkLabel" htmlFor="expiry">Card Expiration</label>
            <CardExpiryElement
                id="expiry"
                onBlur={logEvent('blur')}
                onChange={logEvent('change')}
                onFocus={logEvent('focus')}
                onReady={logEvent('ready')}
                options={ELEMENT_OPTIONS}
            />
            <label className="checkLabel" htmlFor="cvc">CVC</label>
            <CardCvcElement
                id="cvc"
                onBlur={logEvent('blur')}
                onChange={logEvent('change')}
                onFocus={logEvent('focus')}
                onReady={logEvent('ready')}
                options={ELEMENT_OPTIONS}
            />
            <label className="checkLabel" htmlFor="postal">Postal Code</label>
            <input
                id="postal"
                className="checkInput"
                required
                placeholder="12345"
                value={postal}
                onChange={(e) => {
                    setPostal(e.target.value);
                }}
            />
            {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
            {paymentMethod && <Result>Got PaymentMethod: {paymentMethod.id}</Result>}
            <button className="checkButton" type="submit" disabled={!stripe}>
                Pay
            </button>
            {/* {
                errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>
            }
            {
                paymentMethod && <p style={{ color: 'green' }}>Payment Successful</p>
            } */}
        </form>
    );
};

export default CheckoutForm;