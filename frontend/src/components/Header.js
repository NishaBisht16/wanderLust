import React from 'react'
import './Header.css'


function Header() {
  const token=localStorage.getItem('token')
  return (
  
        <div className='header-container'>
            <div className='header'>
                <a href='/'>Home</a>
               <a href='#'>All Listing</a>
               <a href='/create'>Add new Listing</a>
            </div>
              <hr></hr>
        </div> 
  )
}
export default Header;
