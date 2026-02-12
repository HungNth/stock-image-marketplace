import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import { BASE_URL, getConfig } from '../../helpers/config';
import { useSelector } from 'react-redux';

export default function Stripe() {
    const stripePromise = loadStripe('pk_test_51QXy1fHWkzp4E7ie3a6ZXcxBoImQJCfCYlLR4wHIb1lwoytGjn1rGEbqhiDHAytsLrPTpq7B3vT9mdIaYYWXglCy00vOV2UBBu');
    const [clientSecret, setClientSecret] = useState('');
    const { token } = useSelector(state => state.user);
    const { cartItems } = useSelector(state => state.cart);
    
    useEffect(() => {
        fetchClientSecret();
    }, []);
    
    const fetchClientSecret = async() => {
        try {
            const response = await axios.post(`${BASE_URL}/pay/order`, {
                cartItems,
            }, getConfig(token));
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
}
