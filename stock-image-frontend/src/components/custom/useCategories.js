import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../helpers/config.js';

export default function useCategories(hasPictures) {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const fetchCategories = async() => {
            try {
                const response = await axios.get(`${BASE_URL}/categories/${hasPictures}`);
                setCategories(response.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchCategories();
    }, []);
    
    return categories;
}