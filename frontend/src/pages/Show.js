import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Delete, Get, Post } from '../services/Api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Show.css'
import './Style.css'




function Show() {

    const currUser = localStorage.getItem("Id")
    const token = localStorage.getItem('token')
    const loggedInUserId = localStorage.getItem("Id")
    const navigate = useNavigate();

    const { id } = useParams();
    const [Show, setShow] = useState([])
    const [rating, setRating] = useState(0)
    const [feedback, setFeedback] = useState('')
    const [error, seterror] = useState('')
    const [Reviews, setReviews] = useState([])
    const [owner, setOwner] = useState('')
    const [auther, setauther] = useState({})
    const [autherId, setautherId] = useState('')







    const ShowindividualData = async () => {
        try {
            const data = await Get(`showListing/${id}`)
            console.log(data.owner)
            if (data.result > 0) {
                setShow(data.result_value)
                setOwner(data.owner)
            }
            else {
                setShow(data.error_value)
            }
        }
        catch (error) {
            console.log(error)

        }
    }


    const deleteData = async () => {
        const data = await Delete(`deleteListing/${id}`, token)
        if (data.result > 0) {
            alert(data.message)
            navigate('/')
        }
        else {
            alert(data.message)
        }
    }
    useEffect(() => {
        ShowindividualData()
    }, [])



    const reviews = async () => {

        try {

            if (feedback == '') {
                seterror('Please add some comments for review')
                return;
            }
            const sendReviews = await Post(`listings/${id}/reviews`, { rating, feedback }, token)

            if (sendReviews.result > 0) {
                seterror('')
                alert(sendReviews.message)

            }
            else {
                alert(sendReviews.error_value)
            }
        }
        catch (error) {
            console.log(error)
        }
    }



    const getReviews = async () => {
        try {
            const response = await Get(`listings/reviews/${id}`, token);

            if (response.result > 0) {
                const authorNames = response.auther.map((item) => item.username);
                const authorId = response.auther.map((item) => item._id);
                setautherId(authorId)
                setauther(authorNames);
                setReviews(response.result_value);
            } else {
                console.log(response.error_value);
            }
        } catch (error) {
            console.error(error);
        }
    };



    const deleteReviews = async (reviewId, autherId) => {
        if (loggedInUserId == autherId) {
            console.log("ListingId:", id)
            const response = await Delete(`listng/${id}/deleteReview/${reviewId}`, token)
            alert("review deleted.")
        }
        else {
            alert("You are not a auther of this review you can not delete it..")
        }
    }

    useEffect(() => {
        getReviews()
    }, [])


    const handlechange=(e)=>{
        setRating(e.target.value);
    }
    return (
        <div className='main'>
            <Header />

            <div className='row'>
                <div className='col-8 offset-3 mb-3' >
                    <h2>Listing Details</h2>
                </div>
                <div className='row'>
                    <div className="card col-5 offset-3 listing-card " >
                        <h5 className="card-title title">{Show.title}</h5>
                        <img src={Show.image} class="card-img-top" className='show-img' alt="Listing image" />
                        <div className="card-body">

                            <h4> owned by :{owner.username}</h4>
                            {/* <p className='card-text'>{Show.description}</p> */}
                            <p className="card-text">{(Show.price ?? 0).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</p>
                            <p className="card-text">{Show.country}</p>
                            <p className="card-text">{Show.location}</p>
                            {
                                currUser && owner._id == currUser ? <>

                                    <button className='btn btn-success ' onClick={() => navigate('/Edit', { state: { id: Show._id } })} style={{ fontWeight: "bold" }}>Edit</button>
                                    <button className='btn btn-danger' onClick={deleteData} style={{ marginLeft: "20px", fontWeight: "bold" }}>Delete</button>
                                </> : null
                            }
                        </div>
                    </div>


                    <div className='col-5 offset-3  mb-3 mt-3'>
                        <hr />

                      
                            <h4>Leave a Review</h4>
                         
                            
                            <div className='mb-3 mt-3'>
                            <label htmlFor='rating' className='form-label mb-3'>Rating</label>
                        <fieldset class="starability-slot">
                            <input type="radio" id="no-rate" class="input-no-rate" name='review[rating]' value="1" checked aria-label="No rating." onChange={handlechange} />
                            <input type="radio" id="first-rate1" name='review[rating]' value="1" onChange={handlechange}/>
                            <label for="first-rate1" title="Terrible">1 star</label>
                            <input type="radio" id="first-rate2" name='review[rating]' value="2" onChange={handlechange} />
                            <label for="first-rate2" title="Not good">2 stars</label>
                            <input type="radio" id="first-rate3" name='review[rating]'value="3" onChange={handlechange}/>
                            <label for="first-rate3" title="Average">3 stars</label>
                            <input type="radio" id="first-rate4" name='review[rating]' value="4" onChange={handlechange}/>
                            <label for="first-rate4" title="Very good">4 stars</label>
                            <input type="radio" id="first-rate5" name='review[rating]' value="5" onChange={handlechange} />
                            <label for="first-rate5" title="Amazing">5 stars</label>
                        </fieldset>
                      </div>
                      <div className='mb-3 mt-3'>
                                    <label htmlFor='comment' className='form-label'>Comment</label>
                                    <textarea type='range' rows='5' cols='30' id='comment' name='review[comment]' className='form-control' onChange={(e) => setFeedback(e.target.value)}></textarea>
                                    {error && <p className='error'>{error}</p>}

                                </div>
                                <button className='btn btn-success' onClick={reviews}>submit</button>
                                <hr />
                        <p style={{ marginTop: "20px", fontSize: "18px" }}><b>All Reviews</b></p>
                        <div className='row'>
                            {
                                Reviews && Reviews.length > 0 ? (
                                    Reviews.map((items, index) => (

                                        <div className='card col-5 mb-3 ms-3' key={items._id}>
                                            <div className='card-body'>

                                                <h5 className='card-title'>{auther[index]}</h5>
                                                <p class="starability-result" data-rating={items.rating}> </p>
                                                <p className='card-text'>{items.comment}</p>
                                                
                                                <button className='btn btn-sm btn-danger mb-3' onClick={() => deleteReviews(items._id, autherId[index])}>Delete</button>
                                            </div>
                                        </div>

                                    ))
                                ) : (
                                    <p>No reviews available.</p>
                                )
                            }

                        </div>

                    </div>


                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Show
