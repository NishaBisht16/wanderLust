import React, { useEffect } from 'react'
import { useState } from 'react'
import { Get, Put } from '../services/Api'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
 

function Edit() {
  const token=localStorage.getItem('token')
  const API_URL=process.env.REACT_APP_API_URL

    
    const [image,setimage]=useState('')

    const [listing,setListing]=useState({
      title:'',
      price:'',
      location:'',
      country:'',
      
      
    })

  
    const navigate=useNavigate();

  
    const location2=useLocation()
    const { id } = location2.state || {}
    

    const editData=async()=>{
      

        const response=await Get(`EditListing/${id}`,token)
        try{
        
        const fetchListing=({
          title:response.result_value.data.title,
          price:response.result_value.data.price,
          location:response.result_value.data.location,
          country:response.result_value.data.country,
          image:response.result_value.data.image,
          originalImageUrl:response.result_value.originalImageUrl

        })
        setListing(fetchListing)

        
      }
      catch(error)
      {
        navigate('/Error', { state: { err: response.error_value } });
      }
    }

    const handlechange=(e)=>{
      const editData={...listing,[e.target.name]:e.target.value}
      setListing(editData)
    }

    const updateData=async()=>{
      try{
        if(listing.title==''||listing.price==''||listing.location=='' || listing.country=='' || listing.image=='')
        {
          alert('Selected fields should not be empty')
          return;
        }
        const formData=new FormData()
        formData.append('title',listing.title)
        formData.append('price',listing.price)
        formData.append('image',image)
        formData.append('location',listing.location)
        formData.append('country',listing.country)

        const data=await fetch(`${API_URL}updateListing/${id}`,{
          method:'PUT',
          headers:{
            'Authorization': `Bearer ${token}`, 
          },
          body:formData

        })
        const response=await data.json()

        if(response.result>0)
        {
          alert(response.message)
          navigate(`/show/${id}`)
          return;
         
        }
       
        else{
          navigate('/Error', { state: { err: response.message } });

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
          <form onSubmit={(e)=>e.preventDefault()}>
            <div className='mb-3'>
              <label for="title" className='form-lable'>Title</label>
              <input 
              onChange={handlechange}
              name='title'
               value={listing.title}
               className='form-control'>
             </input>
            </div>

            <div className='mb-3'>
              <img src={listing.originalImageUrl ? listing.originalImageUrl : null} style={{ height: '300px', width:'350px' }}/>
            </div>

            <div className='mb-3' >
              <label for="image" className='form-lable'>Upload Image</label>
              <input  accept="image/*" className='form-control' type='file' 
              onChange={(e)=>setimage(e.target.files[0])} />
            </div>
           
               <div className='row'>
               <div className='mb-3 col-md-4'>
              <label for="price" className='form-lable'>Price</label>
              <input 
              onChange={handlechange}
              name='price'
                
              value={listing.price}
                className='form-control'
               ></input>

            </div>
            <div className='mb-3 col-md-8'>
              <label for="country" className='form-lable'>Country</label>
              <input
              onChange={handlechange}
              name='country'
              value={listing.country}
                type='text'
                 className='form-control'
               ></input>
            </div>
               </div>
          

            <div className='mb-3'>
              <label for="location" className='form-lable'>Location</label>
              <input
               onChange={handlechange}
                name='location'
               value={listing.location}
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
