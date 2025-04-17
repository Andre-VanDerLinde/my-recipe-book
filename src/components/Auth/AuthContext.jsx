import { createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

//called in main and wraps entire app
export function AuthProvider({children}){
    const[token, setTokenState] = useState(null)
    const[user, setUser] = useState(null)
    const[favorites, setFavorites] = useState([])

    //loading stored token on site reload if it exists
    useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            setTokenState(storedToken)
        }
    }, [])

    //on token change fetch the favorites array for the specific user
    useEffect(()=>{
        const getFavorites = async () => { 
            try {
                const response = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                const result = await response.json()
    
                setFavorites(result.data)
            } catch (error) {
                setError("Failed to load favorites:", error)
            }
        }

        if(token){
            getFavorites()
        }

    }, [token])

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
        <AuthContext.Provider value={{token, setToken, user, setUser, favorites, setFavorites}}>
            {children}
        </AuthContext.Provider>
    )
}

//creating custom hook
export function useAuth(){
    return useContext(AuthContext)
}