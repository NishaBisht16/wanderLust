const API_URL='http://localhost:8000/'

export const Get=async(endpoint)=>{
    try{
        const response=await fetch(`${API_URL}${endpoint}`,{
            method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
        })
        return await response.json();
    }
    catch(error)
    {
        console.log(error)

    }
}

export const Post=async(endpoint,data)=>{
    try{
        debugger;
        console.log(data)
        const response=await fetch(`${API_URL}${endpoint}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        return await response.json()
    }
    catch(error){
        console.log(error)
    }
}