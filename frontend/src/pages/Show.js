import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Delete, Get } from '../services/Api';
import rupee from '../images/rupee.svg'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Show(){
    const {id}=useParams();
    const[Show,setShow]=useState([])
    const navigate=useNavigate();
    
    const ShowindividualData=async()=>{
        try{
            const data=await Get(`listing/${id}`)
            if(data.result>0)
            {
               setShow(data.result_value)
            }
            else{
                setShow(data.error_value)
            } 
        }
        catch(error)
        {
            console.log(error)

        }
    }

    const deleteData=async()=>{
        const data=await Delete(`delete/${id}`)
        if(data.result>0)
        {
            alert(data.message)
            navigate('/')
        }
        else{
            alert(data.message)
        }
    }
    useEffect(()=>{
        ShowindividualData()
    },[])
  return (
    <div>
        <Header/>
       <p>{Show.title}</p>
       <img src={Show.image} height='200px' width='200px'></img>
       <div style={{display:'flex', alignItems:"center"}}>
        <img src={rupee} height='20px' width='20px' style={{display:"block"}}></img>
        <p>{(Show.price ?? 0).toLocaleString("en-IN", { currency: "INR" })}</p>
        </div>
       <p>{Show.location}</p>
       <p>{Show.country}</p>
       <button onClick={() => navigate('/Edit', { state: { id: Show._id } })}>Edit</button>
       <button onClick={deleteData}>Delete</button>
       <Footer/>
    </div>
  )
}

export default Show
