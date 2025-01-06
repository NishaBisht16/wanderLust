import React, { useState } from 'react'
import Header from '../components/Header'
import validation from './validation/SignupValidation'
import { Post } from '../services/Api'
import { useNavigate } from 'react-router-dom'


const Signup = () => {

  const navigate=useNavigate()
   const [user,setuser]=useState({
    username:'',
    email:'',
    password:''
   })
    const [error,seterror]=useState({})
    
   
       const handleInputs=(e)=>{
         const newUser={...user,[e.target.name]:e.target.value}
         setuser(newUser)
       }
   
       
       const signup=async()=>{
        const validationerror= validation(user)
         seterror(validationerror)
         if(validationerror.username || validationerror.email || validationerror.password )
         {
          return;
         }
         const data=await Post('auth/signup',{
         username: user.username,
         email:user.email,
         password:user.password
         })
         if(data.result>0)
         {
          alert(data.message)
          navigate('/login')
         }
       else{
        alert(data.message)
       }
       }


       
      

  return (
    <div className='main'>
        <Header/>
      
        <div className='row mt-3'>
        <h1 className='col-5 offset-3'>Signup on Wanderlust</h1>
            <div className='col-5 offset-3'>
                <form onSubmit={(e)=>e.preventDefault()} className='needs-validation'>
            <div className='mb-3'>
            <label for="username" className='form-lable'>Username</label>
            <input
            onChange={handleInputs}
            name='username'
            type='text'
            id='username'
             className='form-control'
         
         >
        </input>
        {error.username && <p className='error'>{error.username}</p>}

        </div>
        <div className='mb-3'>
            <label for="email" className='form-lable'>Email</label>
            <input
            onChange={handleInputs}
            name='email'
            type='email'
            id='email'
            className='form-control'
           
         >
        </input>
        {error.email && <p className='error'>{error.email}</p>}

        </div>

        <div className='mb-3'>
            <label for="password" className='form-lable'>Password</label>
            <input
            onChange={handleInputs}
            name='password'
            type='text'
            id='password'
            className='form-control'
         
         >
        </input>
        {error.password && <p className='error'>{error.password}</p>}

        </div>
        <button className='btn btn-success' onClick={signup}>Signup</button>
                </form>

            </div>
        </div>
      
    </div>
  )
}

export default Signup
