import { useNavigate } from "react-router-dom"
import { useAuth } from "../Auth/AuthContext"
import { useState } from "react"

function Favorites(){
    const {token, favorites, setFavorites} = useAuth()
    const [brokenImages, setBrokenImages] = useState([])
    const {error, setError} = useState(null)
    const navigate = useNavigate()

    const handleFavorite = async (recipe) => {
        try {
            await fetch(`https://fsa-recipe.up.railway.app/api/favorites/${recipe.id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
        
            // Remove from local state so the item disappears immediately
            setFavorites((prev) => prev.filter((f) => f.id !== recipe.id));

          } catch (error) {
            setError("Failed to remove favorite", error);
        }
    };

    const handleView = (recipe) => {
        console.log(recipe)
        navigate(`/recipe/${recipe.idMeal}`)
    }

    return (
         <div className="recipe-list">
            {error ? <div className="error-message">{error}</div> :
                favorites
                .filter((recipe) => !brokenImages.includes(recipe.strMealThumb))
                .map((recipe) => (
                    <div className="recipe" key={recipe.idMeal}>
                        {error && <p>{error}</p>}
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
                        
                        <button onClick={() => handleFavorite(recipe)}>❤️</button>
                        
                        <button onClick={() => handleView(recipe)}>View</button>
                    </div>
                )
            )}

            {favorites.length === 0 && <p>No Favorites</p>} 
        </div>
    )
}

export default Favorites