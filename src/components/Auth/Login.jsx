import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { useState } from "react"

function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {setToken, setUser} = useAuth()
    const {error, setError} = useState(null)
    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()

        try {
            const response = await fetch("https://fsa-recipe.up.railway.app/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: username,
                  password: password
                })
            }); 

            const result = await response.json()

            if(!response.ok){
                throw new Error(result.error || "Login Failed")
            }

            setToken(result.token)
            setUser(result.username)
            
            navigate("/") //jump home after finished

        } catch (error) {
            setError(error.message)
        }
    }

    return(
        <div className="login">
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input 
                    type="text" 
                    value={username}
                    onChange={(event)=>setUsername(event.target.value)}
                    />
                </label>

                <label>
                    Password:
                    <input 
                    type="password" 
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                    minLength={6} //make sure password is at least 6 char long
                    />
                </label>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default Login