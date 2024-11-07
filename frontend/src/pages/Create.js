import React, { useState } from 'react'
import { Post } from '../services/Api'

function CreateList() {

    const [title,settitle]=useState('')
    const [price,setprice]=useState('')
    const [location,setlocation]=useState('')
    const [country,setcountry]=useState('')

   
    const createData=async()=>{
      try{
        const data=await Post('create',{title,price,location,country})
        console.log(data)
        if(data.result>1)
        {
          alert(data.message)
        }
        else{
          alert(data.message)
        }
      }
      catch(error)
      {
        console.log("error",error)
      }
    }

  return (
    <div>
      <h1>Here you can add a new list</h1>
      <div>
        <p>Title</p>
        <input onChange={(e)=>settitle(e.target.value)}
        value={title}
        placeholder='Enter Title'
         >
        </input>
         <p>Price</p>
        <input onChange={(e)=>setprice(e.target.value)}
        value={price}
        type='number'
        placeholder='Enter Price'></input>
        <p>Location</p>
        <input
         onChange={(e)=>setlocation(e.target.value)}
         value={location}
         placeholder='Enter Location'></input>
        <p>Country</p>
        <input onChange={(e)=>setcountry(e.target.value)}
        value={country}
        placeholder='Enter Country'
       type='text'
       ></input>
      
      </div>
      <button onClick={createData}>Create</button>
    </div>
  )
}

export default CreateList
