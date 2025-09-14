import React, { useState } from "react";

const RecipeCard = ({ recipe, addFavorite, removeFavorite }) => {
    const [showIngredients, setShowIngredients] = useState(false);

    const toggleIngredients = () => setShowIngredients(!showIngredients);

    return (
        <div className="recipe-card">
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <h3>{recipe.recipe.label}</h3>
            <p><strong>Calories:</strong> {Math.round(recipe.recipe.calories)}</p>

            <button onClick={toggleIngredients}>
                {showIngredients ? "Hide Ingredients" : "Show Ingredients"}
            </button>

            {showIngredients && (
                <ul className="ingredients">
                    {recipe.recipe.ingredientLines.map((line, idx) => (
                        <li key={idx}>{line}</li>
                    ))}
                </ul>
            )}

            {addFavorite && (
                <button onClick={() => addFavorite(recipe)}>Add to Favorites ❤️</button>
            )}

            {removeFavorite && (
                <button onClick={() => removeFavorite(recipe)}>Remove ❌</button>
            )}

            <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
                View Full Recipe
            </a>
        </div>
    );
};

export default RecipeCard;
