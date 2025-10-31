const API_URL=process.env.REACT_APP_API_URL

export const Get=async(endpoint,token)=>{
    try{
        const response=await fetch(`${API_URL}${endpoint}`,{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`


            }
        })
        return await response.json();
    }
    catch(error)
    {
        console.log(error)

    }
}

export const Post=async(endpoint,data,token)=>{
    try{
        console.log("token",token)
        
        const response=await fetch(`${API_URL}${endpoint}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
               "Authorization": `Bearer ${token}`

            },
            body:JSON.stringify(data)
        })
        return await response.json()
    }
    catch(error){
        console.log(error)
    }
}

export const Put=async(endpoint,data,token)=>{
    try{
        console.log(data)
        const response=await fetch(`${API_URL}${endpoint}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`

            },
            body:JSON.stringify(data)
        })
        return await response.json()
    }
    catch(error){
        console.log(error)
    }
}

export const Delete=async(endpoint,token)=>{
    try{
        const response= await fetch(`${API_URL}${endpoint}`,{
            method:"DELETE",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
       return await response.json()
    }
    catch(error)
    {
        console.log(error)

    }
}
