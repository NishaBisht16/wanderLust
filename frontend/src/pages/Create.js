import React, { useState } from 'react'
import { Post } from '../services/Api'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Create.css'
import AddDataValidation from './validation/CreateValidation';

const API_URL=process.env.REACT_APP_API_URL

function CreateList() {

    const [data,setdata]=useState({
      title:'',
      price:'',
      location:'',
      country:''
    })
 const [image,setimage]=useState('')
    

    const userId = localStorage.getItem('userId');

    const [error,seterror]=useState({})

    const handleInputs=(e)=>{
      const newData={...data,[e.target.name]:e.target.value}
      setdata(newData)
    }

    const navigate=useNavigate()
    const createData=async()=>{
      try{
       
      
      const validation= AddDataValidation(data)
      seterror(validation)
      if(validation.title || validation.price || validation.location || validation.country)
      {
        return;
      }

      const formData=new FormData()
      formData.append('title',data.title)
      formData.append('price',data.price)
      formData.append('image',image)
      formData.append('location',data.location)
      formData.append('country',data.country)
      formData.append('owner',userId)
      
        
      const response = await fetch(`${API_URL}createListing`, {
        method: 'POST',
        
        body: formData, 
      });
        const Result=await response.json()
        if(Result.result>0)
        {
          alert(Result.message)
          navigate('/')
          return;
          
        }
        else{
          navigate('/Error', { state: { err: Result.message } });
          return;
        }
      }
      catch(error)
      {
        console.log(error)
      }
    }

  return (
    <div className='main'>
       <Header/>
    
        <div className='row'>
          <div className='col-8 offset-2'>
          <form onSubmit={(e)=>e.preventDefault()}>
          <div className='mb-3'>
            <label for="title" className='form-lable'>Title</label>
            <input onChange={handleInputs}
            name='title'
            type='text'
             placeholder='Enter Title'
             className='form-control'
         >
        </input>
         {error.title && <p className='error'>{error.title}</p>}
          </div>
         
          <div className='mb-3'>
            <label for="image" className='form-lable'> upload listing Image Link</label>
            <input onChange={(e)=>setimage(e.target.files[0])}
            name='image'
            type='file'
            accept="image/*" 
            className='form-control'
            style={{marginBottom:'2rem'}}
         >
        </input>
          </div>
          <div className='row'>
          <div className='mb-3 col-md-4'>
            <label for="price" className='form-lable'>Price</label>
            <input onChange={handleInputs}
            name='price'
           placeholder='Enter Price' className='form-control'></input>
           {error.price && <p className='error'>{error.price}</p>}
          </div>

          <div className='mb-3 col-md-8'>
            <label for="country" className='form-lable'>Country</label>
            <input onChange={handleInputs}
            name='country' 
            placeholder='Enter country'
            type='text'
             className='form-control'/>
             {error.country && <p className='error'>{error.country}</p>}
          </div>

          

          </div>
          <div className='mb-3'>
            <label for="location">Location</label>
            <input
         onChange={handleInputs}
        name='location'
         placeholder='Enter Location' className='form-control'></input> 
         {error.location && <p className='error'>{error.location}</p>}
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
