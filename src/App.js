import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import "./App.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const API_ID = process.env.REACT_APP_EDAMAM_ID;
  const API_KEY = process.env.REACT_APP_EDAMAM_KEY;

  const fetchRecipes = async (query) => {
    if (!query) {
      setError("Please enter a recipe name");
      return;
    }
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
      );

      if (response.data.hits.length === 0) {
        setError("No recipes found!");
      }

      setRecipes(response.data.hits);
    } catch (err) {
      console.error("API Error:", err);
      setError("Something went wrong! Check your API keys.");
    } finally {
      setLoading(false);
    }
  };

  // Add to favorites
  const addFavorite = (recipe) => {
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.recipe.uri === recipe.recipe.uri
    );
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  // Remove from favorites
  const removeFavorite = (recipe) => {
    const updatedFavorites = favorites.filter(
      (fav) => fav.recipe.uri !== recipe.recipe.uri
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="app">
      <h1 className="header">Recipe Finder 🍽️</h1>
      <SearchBar onSearch={fetchRecipes} />
      {loading && <p className="loading">Loading recipes...</p>}
      {error && <p className="error">{error}</p>}
      <RecipeList recipes={recipes} addFavorite={addFavorite} />
      {favorites.length > 0 && (
        <>
          <h2 className="favorites-header">Favorites ❤️</h2>
          <RecipeList recipes={favorites} removeFavorite={removeFavorite} />
        </>
      )}
    </div>
  );
};

export default App;
