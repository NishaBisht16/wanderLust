import React, { useState } from 'react'
import { Post } from '../services/Api'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Create.css'
import AddDataValidation from './validation/CreateValidation';

function CreateList() {

    const [data,setdata]=useState({
      title:'',
      price:'',
      image:'',
      location:'',
      country:''
    })

    const [error,seterror]=useState({})

    const handleInputs=(e)=>{
      const newData={...data,[e.target.name]:e.target.value}
      setdata(newData)

    }

    const navigate=useNavigate()
    const createData=async()=>{
      try{
       
      const validation= AddDataValidation(data)
      console.log("Errors :",validation)
      seterror(validation)
      if(validation.title || validation.price || validation.location || validation.country)
      {
        return;
      }
      
        const response=await Post('createListing',{
          title:data.title,
          price:data.price,
          image:data.image,
          location:data.location,
          country:data.country
        })
        if(response.result>0)
        {
          alert(response.message)
          navigate('/')
          return;
          
        }
        else{
          navigate('/Error', { state: { err: response.message } });
          console.log(response.result)
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
            <label for="image" className='form-lable'>Image Link</label>
            <input onChange={handleInputs}
            name='image'
             type='text'
             placeholder='enter image URL/LINK'
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
