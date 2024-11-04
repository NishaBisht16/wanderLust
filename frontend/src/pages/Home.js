import React, { useEffect,useState} from 'react'
import { Get } from '../services/Api'

function HomeScreen() {
    const[listData,setlistData]=useState([])
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
    <div>
      <h1>Welcome to Home</h1>
      {
        listData.map((data)=>(
            <div key={data._id}>
                <p>{data.title}</p>
                <img src={data.image}></img>
                <p>{data.price}</p>
                <p>{data.location}</p>
                <p>{data.country}</p>
            </div>
        ))
      }
    </div>
  )
}

export default HomeScreen
