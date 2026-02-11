import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../helpers/config.js';
import Spinner from './layouts/Spinner.jsx';
import useCategories from './custom/useCategories.js';
import Categories from './partials/Categories.jsx';
import Extensions from './partials/Extensions.jsx';

export default function Home() {
    const [pictures, setPictures] = useState([]);
    const [extensions, setExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const categories = useCategories(1);
    
    useEffect(() => {
        setLoading(true);
        const fetchPictures = async() => {
            try {
                const response = await axios.get(`${BASE_URL}/pictures`);
                setPictures(response.data.data);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        };
        
        const fetchExtensions = async() => {
            try {
                const response = await axios.get(`${BASE_URL}/extensions`);
                setExtensions(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        
        fetchPictures();
        fetchExtensions();
    }, []);
    
    return (
        <div className="container">
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className="row my-5">
                        <div className="col-md-8">
                            <div className="row">
                                {
                                    pictures?.map((picture) => (
                                        <div key={picture.id} className="col-md-6 mb-2">
                                            <div className="card">
                                                <img src={picture.image_path} alt={picture.title}
                                                     className="card-img-top"
                                                     height="300"
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header bg-white">
                                    <h5 className="text-center mt-2">
                                        <i className="bi bi-filter-circle-fill"></i>{' '}
                                        Filters
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <Categories categories={categories} />
                                    <hr />
                                    <Extensions extensions={extensions} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
