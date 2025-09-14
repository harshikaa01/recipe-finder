import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, addFavorite, removeFavorite }) => {
    if (!recipes || recipes.length === 0) return null;

    return (
        <div className="recipe-list">
            {recipes.map((item, index) => (
                <RecipeCard
                    key={index}
                    recipe={item}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                />
            ))}
        </div>
    );
};

export default RecipeList;
