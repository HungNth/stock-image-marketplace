import { useEffect } from 'react';

export default function useTitle(title) {
    
    useEffect(() => {
        document.title = `Stock Image Marketplace - ${title}`;
    }, [title]);
    
    return null;
}