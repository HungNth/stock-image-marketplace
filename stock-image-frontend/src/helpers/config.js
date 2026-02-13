export const BASE_URL = 'https://stock-image-backend.test/api';

export const getConfig = (token, contentType) => {
    const config = {
        headers: {
            'Content-Type': contentType || 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    
    return config;
};

// get stripe public key from environment variables
export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
