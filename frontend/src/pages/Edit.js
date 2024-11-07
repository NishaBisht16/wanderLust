import React, { useEffect } from 'react'
import { useState } from 'react'
import { Get, Put } from '../services/Api'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Edit() {
    const [title,settitle]=useState('')
    const [price,setprice]=useState('')
    const [location,setlocation]=useState('')
    const [country,setcountry]=useState('')
 
    const navigate=useNavigate();

    console.log(title)
    console.log(price)
    console.log(location)
    console.log(country)
    
    const location2=useLocation()
    const { id } = location2.state || {}

    const editData=async()=>{
      try{
        const response=await Get(`Edit/${id}`)
        console.log(response)     

        settitle(response.result_value.title)
        setprice(response.result_value.price)
        setlocation(response.result_value.location)
        setcountry(response.result_value.country)
      }
      catch(error)
      {
        console.log(Error)
      }
    }

    const updateData=async()=>{
      try{
        const response=await Put(`update/${id}`,{title,price,location,country})
        if(response.result>0)
        {
          alert(response.message)
          navigate(`/show/${id}`)

        }
        else{
          alert(response.message)
        }
      }
      catch(error)
      {
        console.log(error)

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
      <button onClick={updateData} >Update</button>
    </div>
  )
}

export default Edit
