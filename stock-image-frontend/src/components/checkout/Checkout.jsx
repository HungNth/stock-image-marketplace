import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Stripe from './Stripe.jsx';
import useTitle from '../custom/useTitle.js';

export default function Checkout() {
    const { isLoggedIn } = useSelector(state => state.user);
    const navigate = useNavigate();
    
    useTitle('Checkout');
    
    useEffect(() => {
        if (!isLoggedIn) navigate('/login');
        
    }, [isLoggedIn, navigate]);
    
    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-6 mx-auto">
                    <Stripe />
                </div>
            </div>
        </div>
    );
}
