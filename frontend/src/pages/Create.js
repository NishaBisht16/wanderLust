import React, { useState } from 'react'
import { Post } from '../services/Api'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Create.css'

function CreateList() {

    const [title,settitle]=useState('')
    const [price,setprice]=useState('')
    const [location,setlocation]=useState('')
    const [country,setcountry]=useState('')
    const [image,setimage]=useState('')

    const navigate=useNavigate()
    const createData=async()=>{

      try{
        debugger;
        const data=await Post('create',{title,price,location,country})
        console.log(data)
        if(data.result>1)
        {
          alert(data.message)
          navigate('/')
          return;
          
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
    <div className='main'>
       <Header/>
    
        <div className='row'>
          <div className='col-8 offset-2'>
          <form>
          <div className='mb-3'>
            <label for="title" className='form-lable'>Title</label>
            <input onChange={(e)=>settitle(e.target.value)}
            type='text'
            value={title}
             placeholder='Enter Title'
             className='form-control'
         >
        </input>
          </div>
          <div className='mb-3'>
            <label for="title" className='form-lable'>Image Link</label>
            <input onChange={(e)=>setimage(e.target.value)}
            value={image}
             type='text'
             placeholder='enter image URL/LINK'
             className='form-control'
         >
        </input>
          </div>
          <div className='row'>
          <div className='mb-3 col-md-4'>
            <label for="price" className='form-lable'>Price</label>
            <input onChange={(e)=>setprice(e.target.value)}
             value={price}
            type='number'
           placeholder='Enter Price' className='form-control'></input>
          </div>

          <div className='mb-3 col-md-8'>
            <label for="country" className='form-lable'>Country</label>
            <input onChange={(e)=>setcountry(e.target.value)}
            value={country} 
            placeholder='Enter country'
            type='text'
             className='form-control'/>
          </div>

          </div>
        

          <div className='mb-3'>
            <label for="location">Location</label>
            <input
         onChange={(e)=>setlocation(e.target.value)}
         value={location}
         placeholder='Enter Location' className='form-control'></input> 
          </div>
          <div>
          <button onClick={createData} className='btn  btn-primary'>Create</button>
          </div>
          </form>
        </div>
        </div>
    
      <Footer/>
    </div>
  )
}

export default CreateList
