import { useState } from "react"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router-dom"

function Register(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { setToken, setUser } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()

        try {
            const response = await fetch("https://fsa-recipe.up.railway.app/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username, 
                    password: password
                })
            });

            const result = await response.json()
            
            if (!response.ok) {
                throw new Error(result.error || "Registration failed");
            }
              
            setToken(result.token) 
            setUser(result.username)

            navigate("/") //once done jump to home page

        } catch (error) {
            setError(error.message)   
        }
        
    }
    
    return(
        <div className="register">
            <h2>Register</h2>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Create Username: 
                    <input 
                    type="text"
                    value={username}
                    onChange={(event)=>setUsername(event.target.value)}
                    />
                </label>

                <label>
                    Create Password: 
                    <input 
                    type="Password"
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                    minLength={6} //minimum length must be 6 characters
                    />
                </label>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default Register