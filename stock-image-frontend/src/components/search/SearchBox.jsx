import { useState } from 'react';
import axios from 'axios';
import { BASE_URL, getConfig } from '../../helpers/config.js';
import { setCurrentUser, setLoggedInOut, setToken } from '../../redux/slices/userSlice.js';
import { Link } from 'react-router-dom';

export default function SearchBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [pictures, setPictures] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const searchPictures = async(e) => {
        e.preventDefault();
        setMessage('');
        setPictures([]);
        setLoading(true);
        
        const data = { searchTerm };
        
        try {
            const response = await axios.post(`${BASE_URL}/find/pictures`, data);
            if (response.data.data.length) {
                setPictures(response.data.data);
            } else {
                setMessage('No result found.');
            }
            setLoading(false);
            setSearchTerm('');
        } catch (e) {
            setLoading(false);
            setSearchTerm('');
            console.log(e);
        }
    };
    
    return (
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample"
             aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Search</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <form onSubmit={(e) => searchPictures(e)}>
                    <div className="row align-items-center">
                        <div className="col-md-10">
                            <input type="search"
                                   className="form-control"
                                   value={searchTerm}
                                   onChange={(e) => setSearchTerm(e.target.value)}
                                   name="searchTerm"
                                   placeholder="Search..."
                            />
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-sm btn-dark"
                                    disabled={!searchTerm}
                            >
                                <i className="bi bi-search">
                                
                                </i>
                            </button>
                        </div>
                    </div>
                </form>
                {
                    message && (
                        <div className="my-3 alert alert-info">
                            {message}
                        </div>
                    )
                }
                <ul className="list-group my-3">
                    {
                        loading ? (
                            <div className="my-3">
                                <span className="text-muted">
                                    <i>Searching...</i>
                                </span>
                            </div>
                        ) : (
                            pictures.map(picture => (
                                <li key={picture.id} className="list-group-item">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <img src={picture.image_path} alt={picture.title}
                                             className="rounded me-3"
                                             height="60"
                                             width="60"
                                        />
                                        <span className="">
                                            {picture.title}
                                        </span>
                                        <Link
                                            to={`/picture/${picture.id}`}
                                            className="btn btn-link text-decoration-none text-primary"
                                        >
                                            view
                                        </Link>
                                    </div>
                                </li>
                            ))
                        )
                    }
                </ul>
            </div>
        </div>
    );
}
