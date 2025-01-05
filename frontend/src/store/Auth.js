import { createContext, useContext,useState,useEffect } from "react";

export const Authcontext=createContext()

export const AuthProvider=({children})=>{
    const token = localStorage.getItem("token");
    const [isToken, setIsToken] = useState(false);

    useEffect(() => {
        // Check for token in localStorage
        const token = localStorage.getItem("token");
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
    return (
        <Authcontext.Provider value={{login}}>
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

