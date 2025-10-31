import { useState,useEffect  } from "react";
import { GoogleMap,Marker } from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";

import axios from "axios";

const API_URL=process.env.REACT_APP_API_URL
const containerStyle = {
  width: '100%',
  height: '400px',
};
const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090,
};


export const MapContainer=({address})=>{
    
    const [coordinates,setcoordinates]=useState(defaultCenter)

    const fetchcoordinate=async(address)=>{
        debugger;
        try{
            const res=await axios.post(`${API_URL}getcordinates`,{
                address:address
            })

            if (res.data?.coordinates) {
        setcoordinates(res.data.coordinates);
        
      } else {
        console.error('Coordinates not found');
      }

        }catch(error)
        {
            console.error(error)

        }
    }
    useEffect(()=>{
        if(address)
        {
         fetchcoordinate(address)
        }
    },[address])

    return (

        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}> 
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinates}
          zoom={13}
        >
          <Marker position={coordinates} />
        </GoogleMap>
       </LoadScript> 

    )
}


