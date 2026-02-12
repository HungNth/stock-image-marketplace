import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Stripe from './Stripe.jsx';

export default function Checkout() {
    const { isLoggedIn } = useSelector(state => state.user);
    const navigate = useNavigate();
    
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
