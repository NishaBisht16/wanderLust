
export const validategoogletoken=async(token)=>{
  try{
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
    if(!response.ok)
    {
      throw new Error ('Invalid google token')
    }
      return await response.json()
  }
  catch(error)
  {
    console.error("Google validation falid",error.message)
    throw error;

  }
      
      
        
}