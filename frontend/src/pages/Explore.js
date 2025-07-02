//explore page - search recipes
import React, { useEffect, useContext } from "react";
import { RecipeContext } from "../context/recipeContext";
import SearchBar from "../components/searchBar";
import RecipeList from "../components/recipeList";
import "../styles/explore.scss";
import "../styles/recipePage.scss";

const Explore =() =>{
    const { recipes, fetchRecipes, loading } = useContext(RecipeContext);

    useEffect(() =>{
        //prevents duplicate fetches 
        if (recipes.length === 0){  
            fetchRecipes();
        }
    }, []);
    return (
        <div className="explore-container">
            <h2>Explore Recipes</h2>
            <div className="ingredients"></div>
            <SearchBar />
                {loading ? <p>⟳</p>: <RecipeList recipes={recipes}/>}
        </div>
    );
};

export default Explore;