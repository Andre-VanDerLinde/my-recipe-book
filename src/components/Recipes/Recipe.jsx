import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

function Recipe(){
    const [recipes, setRecipes] = useState([])
    const [error, setError] = useState(null)
    const [brokenImages, setBrokenImages] = useState([])
    const { favorites, setFavorites, token } = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        const getRecipes = async () => {
            try {
                const response = await fetch("https://fsa-recipe.up.railway.app/api/recipes")

                const result = await response.json()
                setRecipes(result)

                console.log("Result: ",result)

            } catch (error) {
                setError(error.message)
            }
        }

        getRecipes()

    }, [])

    useEffect(() => {
        console.log("Favorites updated:", favorites);
    }, [favorites]);
      

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
    };
      
 
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
                        {/* //if valid user render favorite button
                        //checks if favorite or not and conditionaly renders text */}
                        {token && (
                            <button onClick={() => handleFavorite(recipe)}>
                                {favorites.some((f) => f.idMeal === recipe.idMeal) ? "❤️" : "🤍"}
                            </button>
                        )}

                        <button onClick={() => handleView(recipe)}>View</button>
                    </div>
                )
            )}    
        </div>
    )
}

export default Recipe