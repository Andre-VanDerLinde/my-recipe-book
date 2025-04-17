import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../Auth/AuthContext"

function RecipeId(){
    const {id} = useParams()
    const [recipe, setRecipe] = useState({})
    const [error, setError] = useState(null)
    const { token, favorites, setFavorites } = useAuth()
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

    const handleFavorite = async (recipe) => {
        try {
            // Find if this recipe is already a favorite
            const currentFavorite = favorites.find(f => f.idMeal === recipe.idMeal);
        
            if (currentFavorite) {
              // DELETE favorite
              await fetch(`https://fsa-recipe.up.railway.app/api/favorites/${currentFavorite.id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
        
              // Remove from state
              setFavorites(prev => prev.filter(f => f.id !== currentFavorite.id));
            } else {
              // POST new favorite
              const response = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  mealId: recipe.idMeal,
                  name: recipe.strMeal,
                  imageUrl: recipe.strMealThumb,
                  strArea: recipe.strArea,
                }),
              });
        
              const result = await response.json();
        
              // Append to favorites
              setFavorites(prev => [...prev, result.data]);
            }
          } catch (error) {
            console.error("Error updating favorites:", error);
          }   
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
                    {token && (
                        <button onClick={() => handleFavorite(recipe)}>
                            {favorites.some((f) => f.idMeal === recipe.idMeal) ? "❤️" : "🤍"}
                        </button>
                    )}

                </div>
            }
        </div>
    )
}

export default RecipeId