import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Delete, Get, Post } from '../services/Api';
import rupee from '../images/rupee.svg'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Show.css'

function Show() {
    const { id } = useParams();
    const [Show, setShow] = useState([])
    const [rating,setRating]=useState(0)
    const [feedback,setFeedback]=useState('')

    const navigate = useNavigate();

   

    const ShowindividualData = async () => {
        try {
            const data = await Get(`listing/${id}`)
            if (data.result > 0) {
                setShow(data.result_value)
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
        const data = await Delete(`delete/${id}`)
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
        try{
            const sendReviews=await Post(`listings/${id}/reviews`,{rating,feedback}) 
            if(sendReviews.result>0)
            {
                alert(sendReviews.message)
            }
            else{
                alert(sendReviews.message)
            }
        }
        catch(error)
        {
            console.log(error)
        }
       


    }

   
    return (
        <div className='main'>
            <Header />

            <div className='row'>
                <div className='col-8 offset-3 mb-3' >
                    <h2>Listing Details</h2>
                </div>
                <div className='row'>
                    <div className="card col-4 offset-3 " >
                        <img src={Show.image} class="card-img-top" className='show-img' alt="Listing image" />
                        <div className="card-body">
                            <h5 className="card-title">{Show.title}</h5>
                            <p className="card-text">{(Show.price ?? 0).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</p>
                            <p className="card-text">{Show.country}</p>
                            <p className="card-text">{Show.location}</p>
                            <button className='btn btn-success ' onClick={() => navigate('/Edit', { state: { id: Show._id } })} style={{ fontWeight: "bold" }}>Edit</button>
                            <button className='btn btn-danger' onClick={deleteData} style={{ marginLeft: "20px", fontWeight: "bold" }}>Delete</button>
                        </div>
                        <div className='col-8  mb-3 mt-3'>
                            <hr />
                            <h4>Leave a Review</h4>
                            <form>
                                <div className='mb-3 mt-3' style={{ display: "flex", alignItems: "center", gap: '5px' }}>
                                    <label htmlFor='rating' className='form-label mb-3'>Rating</label>
                                    <input type='range' min='1' max='5' id='rating' name='review[rating]' className='form-range' onChange={(e)=>setRating(e.target.value)}></input>
                                </div>
                                <div className='mb-3 mt-3'>
                                    <label htmlFor='comment' className='form-label'>Comment</label>
                                    <textarea type='range' rows='5' cols='30' id='comment' name='review[comment]' className='form-control' onChange={(e)=>setFeedback(e.target.value)}></textarea>
                                </div>
                                <button className='btn btn-success' onClick={reviews}>submit</button>
                            </form>

                        </div>
                    </div>


                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Show
