import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

function Recipe(){
    const [recipes, setRecipes] = useState([])
    const [error, setError] = useState(null)
    const [brokenImages, setBrokenImages] = useState([])
    const { token } = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        const getRecipes = async () => {
            try {
                const response = await fetch("https://fsa-recipe.up.railway.app/api/recipes")

                const result = await response.json()
                setRecipes(result)

                console.log(result)

            } catch (error) {
                setError(error.message)
            }
        }
        
        getRecipes()
    }, [])

    const handleFavorite = (recipe) => {

    }

    const handleView = (recipe) => {
        navigate(`recipe/${recipe.idMeal}`)
    }

    return(
        <div className="recipe-list">
            {error ? <p>{error}</p> :
                recipes
                .filter((recipe) => !brokenImages.includes(recipe.strMealThumb))
                .map((recipe) => (
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
                        {token && <button onClick={() => handleFavorite(recipe)}>Favorite</button>}
                        <button onClick={() => handleView(recipe)}>View</button>
                    </div>
                )
            )}    
        </div>
    )
}

export default Recipe