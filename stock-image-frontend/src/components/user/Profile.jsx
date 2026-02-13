import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../custom/useTitle.js';

export default function Profile() {
    const { user, isLoggedIn } = useSelector(state => state.user);
    const navigate = useNavigate();
    
    const [picturesToShow, setPicturesToShow] = useState(6);
    const [ordersToShow, setOrdersToShow] = useState(6);
    
    useTitle('Profile');
    
    useEffect(() => {
        if (!isLoggedIn) navigate('/login');
    }, [isLoggedIn, navigate]);
    
    const loadMorePictures = () => {
        if (picturesToShow > user?.pictures.length) {
            return;
        } else {
            setPicturesToShow(prevPicturesToShow => prevPicturesToShow += 5);
        }
    };
    
    const loadMoreOrders = () => {
        if (ordersToShow > user?.order.length) {
            return;
        } else {
            setOrdersToShow(prevOrdersToShow => prevOrdersToShow += 5);
        }
    };
    
    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white">
                            <h5 className="mt-2 text-center">
                                My Pictures
                            </h5>
                        </div>
                        <div className="card-body">
                            {
                                !user?.pictures.length ? (
                                    <div className="alert alert-info col-md-12 mt-2">
                                        No pictures uploaded yet.
                                    </div>
                                ) : (
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Sales</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        
                                        <tbody>
                                        {
                                            user?.pictures.slice(0, picturesToShow).map((picture, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        <img src={picture.image_path}
                                                             className="rounded"
                                                             alt={picture.title}
                                                             width="60"
                                                             height="60"
                                                        />
                                                    </td>
                                                    <td>{picture.title}</td>
                                                    <td>${picture.price}</td>
                                                    <td>{picture.orders.length}</td>
                                                    <td>
                                                        {
                                                            picture.status ? (
                                                                <span className="badge bg-success">
                                                                    Live
                                                                </span>
                                                            ) : (
                                                                <span className="badge bg-danger">
                                                                    Blocked
                                                                </span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                )
                            }
                            
                            {
                                picturesToShow < user?.pictures.length && (
                                    <div className="d-flex justify-content-center my-3">
                                        <button className="btn btn-sm btn-dark"
                                                onClick={() => loadMorePictures()}
                                        >Load more
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white">
                            <h5 className="mt-2 text-center">
                                My Orders
                            </h5>
                        </div>
                        <div className="card-body">
                            {
                                !user?.orders.length ? (
                                    <div className="alert alert-info col-md-12 mt-2">
                                        No orders yet.
                                    </div>
                                ) : (
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Total</th>
                                            <th>Done</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        
                                        <tbody>
                                        {
                                            user?.orders.slice(0, ordersToShow).map((order, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        <img src={order.picture.image_path}
                                                             className="rounded"
                                                             alt={order.picture.title}
                                                             width="60"
                                                             height="60"
                                                        />
                                                    </td>
                                                    <td>{order.picture.title}</td>
                                                    <td>${order.total}</td>
                                                    <td>{order.created_at}</td>
                                                    <td>
                                                        <Link
                                                            to={`/picture/${order.picture.id}`}
                                                            className="btn btn-primary btn-sm"
                                                        >
                                                            <i className="bi bi-download"></i>
                                                        </Link>
                                                    </td>
                                                
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                )
                            }
                            
                            {
                                ordersToShow < user?.orders.length && (
                                    <div className="d-flex justify-content-center my-3">
                                        <button className="btn btn-sm btn-dark"
                                                onClick={() => loadMoreOrders()}
                                        >Load more
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
