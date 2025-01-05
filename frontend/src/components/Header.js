import React from 'react'
import './Header.css'
import { useAuth } from '../store/Auth'


function Header() {
  const {logout}=useAuth()
  return (

    <div className='header-container'>
      <div className='header'>
        <div>
          <a href='/'>Home</a>
          <a href='#'>All Listing</a>
          <a href='/create'>Add new Listing</a>
        </div>

        <div className='ms-auto'>
          <a href='/signup'>Sign up</a>
          <a href='/login'>Log in</a>
          <a href='/' onClick={logout} >Log out</a>
        </div>

      </div>
      <hr></hr>
    </div>
  )
}
export default Header;
