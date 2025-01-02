import React from 'react'
import Header from '../components/Header'

const Signup = () => {
  return (
    <div className='main'>
        <Header/>
      
        <div className='row mt-3'>
        <h1 className='col-5 offset-3'>Signup on Wanderlust</h1>
            <div className='col-5 offset-3'>
                <form onSubmit={(e)=>e.preventDefault} className='needs-validation'>
            <div className='mb-3'>
            <label for="username" className='form-lable'>Username</label>
            <input
            name='username'
            type='text'
            id='username'
             className='form-control'
             required
         >
        </input>

        </div>
        <div className='mb-3'>
            <label for="email" className='form-lable'>Email</label>
            <input
            name='email'
            type='email'
            id='email'
             className='form-control'
             required
         >
        </input>

        </div>

        <div className='mb-3'>
            <label for="password" className='form-lable'>Password</label>
            <input
            name='password'
            type='text'
            id='password'
             className='form-control'
             required
         >
        </input>

        </div>
        <button className='btn btn-success'>Signup</button>

        
                </form>

            </div>
        </div>
      
    </div>
  )
}

export default Signup
