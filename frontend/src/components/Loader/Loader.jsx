import React from "react";
import "./Loader.css"; 
import { useLoader } from "./LoaderContext";


function Loader() {
  const {loading}=useLoader()

  if(!loading){
    return null
  }
  return (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;                                
