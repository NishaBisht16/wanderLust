import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Delete, Get, Post } from '../services/Api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Show.css'
import './Style.css'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
// import { MapContainer } from '../components/MapContainer/MapContainer';

// const containerStyle = {
//     width: '600px',
//     height: '400px',
// }

function Show() {

    // const [viewport, setViewport] = useState({
    //     latitude: 28.6448,
    //     longitude: 77.216,
    //     zoom: 6
    // });

    // const center = {
    //     lat: viewport.latitude,
    //     lng: viewport.longitude,
    // }

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: ""
    // })

    // const [map, setMap] = useState(null)

    // const onLoad = React.useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds(center)
    //     map.fitBounds(bounds)
    //     setMap(map)
    // }, [center])

    // const onUnmount = React.useCallback(function callback() {
    //     setMap(null)
    // }, [])

    const navigate = useNavigate();
    const { id } = useParams();

    const [Show, setShow] = useState({})
    const [rating, setRating] = useState(0)
    const [feedback, setFeedback] = useState('')
    const [error, seterror] = useState('')
    const [Reviews, setReviews] = useState([])

    const ShowindividualData = async () => {
        try {
            const data = await Get(`showListing/${id}`)
            if (data.result > 0) {
                setShow(data.result_value)
            } else {
                setShow(data.error_value)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const currentuser = localStorage.getItem("userId")
    const token = localStorage.getItem('token')



    // useEffect(() => {
    //     if (Show.location && Show.location.latitude && Show.location.longitude) {
    //         setViewport({
    //             latitude: Show.location.latitude,
    //             longitude: Show.location.longitude,
    //             zoom: 6
    //         });
    //     }
    // }, [Show]);

    const deleteData = async () => {
       const confirm= window.confirm("Are you sure you want to delete this listing? ")
       if(!confirm)
        return;

        const data = await Delete(`deleteListing/${id}`, token)
        if (data.result > 0) {
            alert(data.message)
            navigate('/')
        } else {
            alert(data.message)
        }
    }

    const createReviews = async () => {

        try {
            if (feedback === '') {
                seterror('Please add some comments for review')
                return;
            }
            const sendReviews = await Post(`listings/${id}/reviews`, { rating, feedback, currentuser }, token)
            setFeedback('')
            setRating('')

            if (sendReviews.result > 0) {
                seterror('')
                alert(sendReviews.message)
                getReviews();

            } else {
                alert(sendReviews.error_value)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getReviews = async () => {
        try {
            const response = await Get(`listings/reviews/${id}`, token);
            if (response.result > 0) {
                setReviews(response.result_value);
            } else {
                console.log(response.error_value);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteReviews = async (reviewId, authorId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) return; 

    if (currentuser === authorId) {
        try {
            const response = await Delete(`listng/${id}/deleteReview/${reviewId}`);

            if (response && response.result > 0) {
                alert("Review deleted successfully.");
                ShowindividualData(); 
                getReviews();          
            } else {
                alert("Failed to delete review. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("Something went wrong. Please try again later.");
        }
    } else {
        alert("You are not the author of this review.");
    }
};


    useEffect(() => {
        ShowindividualData()
        getReviews()
      
    }, [])

    const handlechange = (e) => {
        setRating(e.target.value);
    }

    return (
        <div className='main'>
            <Header />
            <div className='row'>
                <div className='col-8 offset-3 mb-3'>
                    <h2>Listing Details</h2>
                </div>
                <div className='row'>
                    <div className="card col-5 offset-3 listing-card">
                        <h5 className="card-title title">{Show.title}</h5>
                        {Show.image && <img src={Show.image.url} className='show-img' alt="Listing" />}
                        <div className="card-body">
                            <h4>Owned by: {Show.owner?.username ?? ''}</h4>
                            <p className="card-text">{(Show.price ?? 0).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</p>
                            <p className="card-text">{Show.country}</p>
                            <p className="card-text">{Show.location?.address ?? ''}</p>
                            {currentuser && Show.owner?._id === currentuser && (
                                <>
                                    <button className='btn btn-success' onClick={() => navigate('/Edit', { state: { id: Show._id } })}>Edit</button>
                                    <button className='btn btn-danger' style={{ marginLeft: "20px" }} onClick={deleteData}>Delete</button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='col-5 offset-3 mb-3 mt-3'>
                        <hr />
                        <h4>Leave a Review</h4>

                        <div className='mb-3 mt-3'>
                            <label htmlFor='rating' className='form-label mb-3'>Rating</label>
                            <fieldset className="starability-slot">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <React.Fragment key={num}>
                                        <input type="radio" id={`first-rate${num}`} name='review[rating]' value={num} onChange={handlechange} />
                                        <label htmlFor={`first-rate${num}`} title={`${num} star`}>{num} star</label>
                                    </React.Fragment>
                                ))}
                            </fieldset>
                        </div>
                        <div className='mb-3 mt-3'>
                            <label htmlFor='comment' className='form-label'>Comment</label>
                            <textarea rows='5' cols='30' id='comment' name='review[comment]' className='form-control' onChange={(e) => setFeedback(e.target.value)}></textarea>
                            {error && <p className='error'>{error}</p>}
                        </div>
                        <button className='btn btn-success' onClick={createReviews}>Submit</button>
                        <hr />
                        {Reviews.length > 0 && (
                            <div className='row'>
                                <p style={{ marginTop: "20px", fontSize: "18px" }}><b>All Reviews</b></p>
                                {Reviews.map((items, index) => (
                                    <div className='card col-5 mb-3 ms-3' key={items._id}>
                                        <div className='card-body'>
                                            <h5 className='card-title'>{items.author?.username}</h5>
                                            <p className="starability-result" data-rating={items.rating}></p>
                                            <p className='card-text'>{items.comment}</p>
                                            {items.author?._id === currentuser ? (
                                                <button
                                                    className='btn btn-sm btn-danger mb-3'
                                                    onClick={() => deleteReviews(items._id, items.author?._id)}
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                ""
                                            )}


                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}


                        {/* <div className='col-8  mb-3 mt-3'>
                                <h4>Where you'll be</h4>
                                <MapContainer address={Show.country}/>
                            </div> */}

                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Show
