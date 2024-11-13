import React, { useEffect } from 'react'
import { useState } from 'react'
import { Get, Put } from '../services/Api'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Edit() {
    const [title,settitle]=useState('')
    const [price,setprice]=useState('')
    const [location,setlocation]=useState('')
    const [country,setcountry]=useState('')
    const [image,setimage]=useState('')
 
    const navigate=useNavigate();

   
    
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
        setimage(response.result_value.image)
      }
      catch(error)
      {
        console.log(Error)
      }
    }

    const updateData=async()=>{
      try{
        const response=await Put(`update/${id}`,{title,price,location,country,image})
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
    <div className='main'>
      <Header/>

      <div className='row' >
        <div className='col-8 offset-2'>
          <form>
            <div className='mb-3'>
              <label for="title" className='form-lable'>Title</label>
              <input onChange={(e)=>settitle(e.target.value)}
               value={title}
               className='form-control'>
             </input>
            </div>

            <div className='mb-3' >
              <label for="image" className='form-lable'>Image/Link</label>
              <input onChange={(e)=>setimage(e.target.value)} accept="image/*" className='form-control'  value={image} />
            </div>
           
               <div className='row'>
               <div className='mb-3 col-md-4'>
              <label for="price" className='form-lable'>Price</label>
              <input onChange={(e)=>setprice(e.target.value)}
              value={price}
               type='number'
                className='form-control'
               ></input>

            </div>
            <div className='mb-3 col-md-8'>
              <label for="country" className='form-lable'>Country</label>
              <input onChange={(e)=>setcountry(e.target.value)}
              value={country}
                type='text'
                 className='form-control'
               ></input>
            </div>
               </div>
          

            <div className='mb-3'>
              <label for="location" className='form-lable'>Location</label>
              <input
               onChange={(e)=>setlocation(e.target.value)}
               value={location}
                className='form-control'
               ></input>
            </div>
            <button onClick={updateData} className='btn btn-success'>Update</button>
          </form>
        </div>
      </div>
      <div>
       
    
      </div>
    
      <Footer/>
    </div>
  )
}

export default Edit
