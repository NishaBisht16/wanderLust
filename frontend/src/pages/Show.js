import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Get } from '../services/Api';
import rupee from '../images/rupee.svg'

function Show(){
    const {id}=useParams();
    const[Show,setShow]=useState([])
    
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

    useEffect(()=>{
        ShowindividualData()
    },[])
  return (
    <div>
       <h1>Display idividual data</h1>
       <p>{Show.title}</p>
       <img src={Show.image}></img>
       <div style={{display:'flex', alignItems:"center"}}>
        <img src={rupee} height='20px' width='20px' style={{display:"block"}}></img>
        <p>{(Show.price ?? 0).toLocaleString("en-IN", { currency: "INR" })}</p>
        </div>
       <p>{Show.location}</p>
       <p>{Show.country}</p>
    </div>
  )
}

export default Show
