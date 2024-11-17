import React, { useEffect,useState} from 'react'
import { Get } from '../services/Api'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import rupee from '../images/rupee.svg'
import './Home.css'


function HomeScreen() {
    const[listData,setlistData]=useState([])
    console.log("Counter component rendered");
    const navigate=useNavigate();
    const getAllData=async()=>{
        try{
            const data=await Get('allListing')   
            if(data.result>0)
            {
                setlistData(data.result_value)
            }
            else{
                setlistData([])
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllData()
    },[])

  return (
    <div className='main'>
      <div style={{marginLeft:"20px"}}>
     <Header/>
     <h1>All listings</h1>
     <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1'>
      {
        listData.map((data)=>(
            <div key={data._id}>
              <a href={`/show/${data._id}`} className='listing-link'>
            <div className="card col " style={{ width: '30rem' }}>
              <div className='card-img-overlay'></div>
              <div className="card-body">
            <img style={{ height: '20rem' }} src={data.image} className="card-img-top" alt="Listing" />
              <h5 className="card-title">{data.title} </h5>
              <p>{(data.price ?? 0).toLocaleString("en-IN", {style: "currency", currency: "INR" })}/night</p>
              </div>
              </div>
              </a>
              </div>

           
        ))
      } </div>
      </div>
      
      <Footer/>
    </div>
  )
}

export default HomeScreen;
