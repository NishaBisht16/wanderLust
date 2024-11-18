import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Delete, Get } from '../services/Api';
import rupee from '../images/rupee.svg'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Show.css'

function Show() {
    const { id } = useParams();
    const [Show, setShow] = useState([])
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
    return (
        <div className='main'>
            <Header />

            <div className='row'>
                <div className='col-8 offset-2 mb-3' >
                    <h2>Listing Details</h2>
                </div>
                <div className='row'>
                    <div className="card col-4 offset-2 " >
                        <img src={Show.image} class="card-img-top" className='show-img' alt="Listing image" />
                        <div className="card-body">
                            <h5 className="card-title">{Show.title}</h5>
                            <p  className="card-text">{(Show.price ?? 0).toLocaleString("en-IN", { style: "currency",currency: "INR" })}</p>
                              <p  className="card-text">{Show.country}</p>
                            <p  className="card-text">{Show.location}</p>
                            <button className='btn btn-success ' onClick={() => navigate('/Edit', { state: { id: Show._id } })} style={{fontWeight:"bold"}}>Edit</button>
                            <button   className = 'btn btn-danger' onClick={deleteData} style={{marginLeft:"20px", fontWeight:"bold"}}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Show
