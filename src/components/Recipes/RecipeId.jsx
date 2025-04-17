import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../Auth/AuthContext"

function RecipeId(){
    const {id} = useParams()
    const [recipe, setRecipe] = useState({})
    const [error, setError] = useState(null)
    const { token } = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        const getRecipe = async () => {
            try {
                const response = await fetch(`https://fsa-recipe.up.railway.app/api/recipes/${id}`)
                const result = await response.json()
                
                setRecipe(result)
                
            } catch (error) {
                setError(error.message)
            }
        }

        getRecipe()

    }, [id])

    const handleBack = () => {
        navigate('/')
    }

    const handleFavorite = (recipe) => {
        
    }

    return(
        <div className="recipe-id">
            {error ? <p>{error}</p> : 
                <div className="recipe" key={recipe.idMeal}>
                    <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        onError={() =>
                            setBrokenImages((prev) => [...prev, recipe.strMealThumb])
                        }
                        width={250}
                    />
                    <p>{recipe.strTags}</p>
                    <h2>{recipe.strMeal}</h2>
                    <button onClick={() => handleBack()}>Back</button>
                    {token && <button onClick={() => handleFavorite(recipe)}>Favorite</button>}
                </div>
            }
        </div>
    )
}

export default RecipeId