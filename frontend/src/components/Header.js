import React, { useContext } from 'react'
import './Header.css'
import { useAuth } from '../store/Auth'
import search from '../images/search.png'
import magnifying from '../images/magnifying-glass.png'
import { useState } from 'react'

function Header() {
  const {logout}=useAuth()
  const token=localStorage.getItem('token')
  const {setSearchquery}=useAuth()

  return (

    <div className='header-container'>
      <div className='header'>
        <div>
          <a href='/'>Explore</a>
         
        </div>

        <nav class="navbar bg-body-tertiary ms-auto">
 
        <form className="d-flex" role="search">
  <input
    className="form-control me-2 search-input"
    type="search"
    placeholder="Search Destinations"
    onChange={(e)=>setSearchquery(e.target.value)}
    
  />
  <button className="btn btn-search d-flex align-items-center rounded-pill" type="submit" >
    <img
      src={magnifying}
      alt="Search Icon" 
      
    />
    <span>Search</span>
  </button>
</form>

</nav>

        <div className='ms-auto'>
        <a href='/create'>Add your Home</a>
          {
            token ? <a href='/login' onClick={logout} ><b>Log out</b></a> :
            <>
            <a href='/signup'><b>Sign up</b></a>
            <a href='/login'><b>Log in</b></a>
             
            </>
          }
        </div>

      </div>
      <hr></hr>
    </div>
  )
}
export default Header;
