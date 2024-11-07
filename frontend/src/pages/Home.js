import React, { useEffect,useState} from 'react'
import { Get } from '../services/Api'
import { useNavigate } from 'react-router-dom';

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
    <div>
     
      {
        listData.map((data)=>(
            <ul key={data._id}>
                <li><a href={`/show/${data._id}`}>{data.title}</a></li>
            </ul>
        ))
      }
      <button onClick={()=>navigate('/create')}>Create New</button>
    </div>
  )
}

export default HomeScreen;
