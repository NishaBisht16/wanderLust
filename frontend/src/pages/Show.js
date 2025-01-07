import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Delete, Get, Post } from '../services/Api';
import rupee from '../images/rupee.svg'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Show.css'




function Show() {
    
    const currUser=localStorage.getItem("Id")
    const token=localStorage.getItem('token')
    const { id } = useParams();
    const [Show, setShow] = useState([])
    const [rating,setRating]=useState(0)
    const [feedback,setFeedback]=useState('')
     const [error,seterror]=useState('')
     const [Reviews,setReviews]=useState([])
     const [owner,setOwner]=useState('')
    

    const navigate = useNavigate();

   

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
        const data = await Delete(`deleteListing/${id}`,token)
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
            
              if(feedback=='')
              {
                seterror('Please add some comments for review')
                return;
              }
            const sendReviews=await Post(`listings/${id}/reviews`,{rating,feedback},token) 

            if(sendReviews.result>0)
            { 
                seterror('')
                alert(sendReviews.message)
                
            }
            else{
                alert(sendReviews.error_value)
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }
    
    const getReviews=async()=>{
        const response=await Get(`listings/reviews/${id}`,token)
        console.log("response:",response)
        if(response.result>0)
        {
            setReviews(response.result_value)
        }
        else{
            console.log(response.error_value)
        }

    }

    const deleteReviews=async(reviewId)=>
    {
        console.log("reviewId:",reviewId)
        console.log("ListingId:",id)
        const response=await Delete(`listng/${id}/deleteReview/${reviewId}`,token)
        
    }
 
    useEffect(()=>{
        getReviews()
    },[])
   
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
                              currUser && owner._id ==currUser ?<>
                                
                            <button className='btn btn-success ' onClick={() => navigate('/Edit', { state: { id: Show._id } })} style={{ fontWeight: "bold" }}>Edit</button>
                            <button className='btn btn-danger' onClick={deleteData} style={{ marginLeft: "20px", fontWeight: "bold" }}>Delete</button>
                                </>:null
                            }
                        </div>
                        </div>
                     
                        
                        <div className='col-5 offset-3  mb-3 mt-3'>
                            <hr />
                            {
                            currUser && owner._id ==currUser ?
                            <>
                            <h4>Leave a Review</h4>
                            <form onSubmit={(e)=>{e.preventDefault()}}>
                                <div className='mb-3 mt-3' style={{ display: "flex", alignItems: "center", gap: '5px' }}>
                                    <label htmlFor='rating' className='form-label mb-3'>Rating</label>
                                    <input type='range' min='0' max='5' id='rating' name='review[rating]' className='form-range' onChange={(e)=>setRating(e.target.value)}></input>
                                </div>
                                <div className='mb-3 mt-3'>
                                    <label htmlFor='comment' className='form-label'>Comment</label>
                                    <textarea type='range' rows='5' cols='30' id='comment' name='review[comment]' className='form-control' onChange={(e)=>setFeedback(e.target.value)}></textarea>
                                    {error && <p className='error'>{error}</p>}

                                </div>
                                <button className='btn btn-success' onClick={reviews}>submit</button>
                            </form></>:null
                      }
                             <p style={{marginTop:"20px",fontSize:"18px"}}><b>All Reviews</b></p>
                             <div className='row'>
                            {
                                Reviews.map((items)=>(
                                    <div className='card col-5 mb-3 ms-3'>
                                        <div className='card-body'>
                                            <h5 className='card-title'>Nisha Bisht</h5>
                                            <p className='card-text'>{items.comment}</p>
                                            <p className='card-text'>{items.rating} stars</p>
                                            <button className='btn btn-sm btn-danger mb-3' onClick={()=>deleteReviews(items._id)}>Delete</button>

                                        </div>
                                    </div>
                                ))
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
