import React, { useState } from 'react'
import Header from '../components/Header'
import { Post } from '../services/Api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/Auth'



const Login = () => {
    const navigate=useNavigate()
const [username,setusername]=useState('')
const [usernameerror,setusernameerror]=useState('')
const [password,setpassword]=useState('')
const [passworderror,setpassworderror]=useState('')


const {login}=useAuth()
const {currentUser}=useAuth()

  const loginUser=async()=>{

    if(username=='' || password=='')
    {
        return;
    }
     
    const data=await Post('auth/login',{username,password})

    if(data.result>0)
    {
        
        console.log("current logged in user id:",data.curruser._id)
        login(data.token)
        currentUser(data.curruser._id)
        
        alert(data.message)
        navigate('/')
    }
    else{
        setusernameerror(data.username_error)
        setpassworderror(data.Password_error)
    }
  }

  console.log(usernameerror)
  console.log(passworderror)
  return (
    <div className='main'>
        <Header/>
         <div className='row mt-3'>
        <h1 className='col-5 offset-3'>Login</h1>
            <div className='col-5 offset-3'>
                <form onSubmit={(e)=>e.preventDefault()} className='needs-validation'>
            <div className='mb-3'>
            <label for="username" className='form-lable'>Username</label>
            <input
            onChange={(e)=>setusername(e.target.value)}
            name='username'
            value={username}
            type='text'
            id='username'
             className='form-control'
         >
        </input>
        {usernameerror && <p className='error'>{usernameerror}</p>}
        </div>

        <div className='mb-3'>
            <label for="password" className='form-lable'>Password</label>
            <input
            onChange={(e)=>setpassword(e.target.value)}
            value={password}
            name='password'
            type='text'
            id='password'
             className='form-control'
         >
        </input>
        {passworderror && <p className='error'>{passworderror}</p>}
        </div>
        <button className='btn btn-success' onClick={loginUser}>Login</button>
        </form>
        </div>

        </div>
      
    </div>
  )
}

export default Login
