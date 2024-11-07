import React, { useEffect } from 'react'
import { useState } from 'react'
import { Get } from '../services/Api'
import { useLocation } from 'react-router-dom';

function Edit() {
    const [title,settitle]=useState('')
    const [price,setprice]=useState('')
    const [location,setlocation]=useState('')
    const [country,setcountry]=useState('')
    const [Edit,setEdit]=useState([])
    
    const location2=useLocation()
    const { id } = location2.state || {}

    const editData=async()=>{
      try{
        const response=await Get(`Edit/${id}`)
        console.log(response)
           
        settitle(response.result_value.data.title)
        setprice(response.result_value.data.price)
        setlocation(response.result_value.data.location)
        setcountry(response.result_value.data.country)
    
      }
      catch(error)
      {

      }
    }

    useEffect(()=>{
      editData()
    },[])
  return (
    <div>
        <h1>Here you can Edit list</h1>
      <div>
        <p>Title</p>
        <input onChange={(e)=>settitle(e.target.value)}
        value={title}>
        </input>
         <p>Price</p>
        <input onChange={(e)=>setprice(e.target.value)}
        value={price}
        type='number'
        ></input>
        <p>Location</p>
        <input
         onChange={(e)=>setlocation(e.target.value)}
         value={location}
         ></input>
        <p>Country</p>
        <input onChange={(e)=>setcountry(e.target.value)}
       value={country}
       type='text'
      
       ></input>
      
      </div>
      <button >Update</button>
    </div>
  )
}

export default Edit