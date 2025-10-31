import { createContext, useContext,useState,useEffect } from "react";

export const Authcontext=createContext()

export const AuthProvider=({children})=>{
  
    const [isToken, setIsToken] = useState(false);
    const [currUser,setcurrUser]=useState(false)
    const [searchquery,setSearchquery]=useState('')


    useEffect(() => {
        // Check for token in localStorage
        const token = localStorage.getItem("token");
        const currentuserId=localStorage.getItem("Id")
        setcurrUser(!!currentuserId)
        setIsToken(!!token); // Set to true if token exists, false otherwise
      }, []);

    const login=(token)=>{
        if(!isToken)
        {
            localStorage.setItem("token",token)
            setIsToken(true)
        }
        else{
            setIsToken(false)
        }
    }

        const logout=()=>{
           
                localStorage.removeItem('token')
                localStorage.removeItem('Id')
                setIsToken(false)
        }

        const currentUser=(currentUserId)=>{
            if(!currUser)
            {
                localStorage.setItem('Id',currentUserId)
                setcurrUser(true)
            }
            else{
                setcurrUser(false)
            }
        }

    
    return (
        <Authcontext.Provider value={{login,logout,currentUser,searchquery,setSearchquery}}>
            {children}
        </Authcontext.Provider>
    )
}
export const useAuth = () => {
    const authContextValue = useContext(Authcontext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};

