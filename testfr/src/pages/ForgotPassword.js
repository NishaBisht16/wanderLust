import React, { useState } from 'react'
import { Post } from '../services/Api'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const [email,setemail]=useState('')

    const forgotPassword=async()=>{
        try{
            const data=await Post('auth/forgotpassword',{email})
            if(data.result==1)
            {
                toast.success(data.message)
                
            }

            else{
                toast.error(data.message)
            }

        }catch(error)
        {
            toast.error(error.message)

        }
    }

   
  return (
    <div className='main'>
        <div className='row mt-5'>
                <div className='col-6 offset-3 text-center'>
                    <h4 >Forgot your password?</h4>
           <p >Enter your email and we'll send you a reset link</p>

                </div>
            
           <form onSubmit={(e)=>e.preventDefault()}>
             <div className='col-6 offset-3' >
            <input 
            className='form-control'
            value={email}
               type='email'
              onChange={(e)=>setemail(e.target.value)}

        />

      

           </div>
           <div className='col-6 offset-3 text-center mt-4 pt-3'>
            <button className='btn btn-success' onClick={forgotPassword} disabled={!email}>SEND RESET LINK</button>
        <p className='fs-4 mt-3'>Remembered it? <a href='/login' className='text-decoration-none'>Back to login</a></p>

           </div>

           </form>
          
         
        

        </div>
        
    </div>
    


  )
}

export default ForgotPassword