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