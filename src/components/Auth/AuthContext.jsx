import { createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

//called in main and wraps entire app
export function AuthProvider({children}){
    const[token, setTokenState] = useState(null)
    const[user, setUser] = useState(null)

    //loading stored token on site reload if it exists
    useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            setTokenState(storedToken)
        }
    }, [])

    //saves or removes token from local storage
    const setToken = (newToken) => {
        if(newToken){
            localStorage.setItem("token", newToken)
        }
        else{
            localStorage.removeItem("token")
        }
        setTokenState(newToken)
    };

    //wraps entire app and makes values available to any child
    return(
        <AuthContext.Provider value={{token, setToken, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

//creating custom hook
export function useAuth(){
    return useContext(AuthContext)
}