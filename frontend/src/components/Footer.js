import './Footer.css'
import React from 'react'
import facebook from '../images/facebook.svg'
import instagram from '../images/instagram.svg'
import linkedin from '../images/linkedin.svg'
 

function Footer() {
  return (
  
      <div className='footer-container'>
       <div className='social-info'>
       <img src={facebook} height='30px' width='30px'/>
       <img src={instagram} height='30px' width='30px'/>
       <img src={linkedin} height='30px' width='30px'/>
       </div>
       <div className='brand-info'> &copy; WanderLust Private Limited</div>
       <div className='info-Link'>
        <a href='/privacy'>Privacy</a>
        <a href='/terms'>Terms</a>
       </div>
    </div>

    
  )
}

export default Footer
