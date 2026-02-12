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