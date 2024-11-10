import React, { useEffect,useState} from 'react'
import { Get } from '../services/Api'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import rupee from '../images/rupee.svg'
import './Home.css'


function HomeScreen() {
    const[listData,setlistData]=useState([])
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
     <Header/>
     <h1>ALL LISTING</h1>
     <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1'>
      {
        listData.map((data)=>(
            // <ul key={data._id}>
            //     <li><a href={`/show/${data._id}`}>{data.title}</a></li>
            // </ul>
          
            <div>
              <a href={`/show/${data._id}`} className='listing-link'>
            <div className="card col " style={{ width: '30rem' }}>
              <div className='card-img-overlay'></div>
              <div className="card-body">
            <img style={{ height: '20rem' }} src={data.image} className="card-img-top" alt="Listing" />
              <h5 className="card-title">{data.title} </h5>
              <div style={{display:'flex' , paddingTop:"0"}}  >
             <img src={rupee} height='20px' width='20px' style={{display:"block"}}></img>
              <p>{(data.price ?? 0).toLocaleString("en-IN", { currency: "INR" })}/night</p>
              
              </div>
              </div>
              </div>
              </a>
              </div>

           
        ))
      } </div>
      
      <Footer/>
    </div>
  )
}

export default HomeScreen;
