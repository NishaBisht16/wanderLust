import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'

function Error() {
    const location=useLocation()
    const errorMessage = location.state?.err || "An unknown error occurred.";

  return (
    <div className='main'>
    <div style={{marginLeft:"20px"}}>
   <Header/>
   <div className='row'>
        <div className="alert alert-danger col-6 offset-3" role="alert">
            <p>{errorMessage}</p>
       
        </div>

   </div>
   

   </div>
      <Footer/>
    </div>
  )
}

export default Error
