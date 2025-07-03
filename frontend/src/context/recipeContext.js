//global context for calling and storing recipes from public api

import { createContext, useState, useEffect } from "react";

//create a context for recipes
export const RecipeContext = createContext();

const RecipeProvider =({children}) => {
    //state to store the list of recipes 
    const [recipes, setRecipes] = useState(([]));
    //track loading state
    const [loading, setLoading] = useState(false);

    const API_KEY = process.env.REACT_APP_API_KEY;

    // Warn if API key is missing (helps avoid silent failure)
    if (!API_KEY) {
        console.warn("Missing Spoonacular API key! Please check your .env file.");
    }
    //load from session storage on initial render
    useEffect(() => {
        const cached = sessionStorage.getItem("recipes");
        if (cached) {
            setRecipes(JSON.parse(cached));
        }
    }, []);

    //function to fetch recipes based on search term or filters
    const fetchRecipes = async (query ="", mealType ="", dietaryPreference = "", quickFilter = "") => {
        //if recipes already exist in state, do not fetch again
        //if (recipes.length > 0) return;

        //start loading state
        setLoading(true);

        let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=20&addRecipeInformation=true`;

        //if a search term is provided, add it to the url
        if (query) url += `&query=${encodeURIComponent(query)}`;
        if (mealType) url += `&type=${encodeURIComponent(mealType)}`;
        if (dietaryPreference) url += `&diet=${encodeURIComponent(dietaryPreference)}`;

        //if a category is selected, add it as a dietary filter
        if (quickFilter === "maxReadyTime=20") {
            url += `&maxReadyTime=20`;
        } else if (quickFilter) {
            url += `&tags=${encodeURIComponent(quickFilter)}`;
        }

        try {
            const response = await fetch(url);
            //fetch response in json format
            const data = await response.json();
            const results = data.results || [];
            //update state with fetched recipes
            setRecipes(results);

            //store the fetched recipes in session storage so they persist after refresh
            sessionStorage.setItem("recipes", JSON.stringify(results));
        } catch (err){
            console.error("Error fetching recipes:", err);
        }
        //stop loading state 
        setLoading(false);
    };
    return (
        <RecipeContext.Provider value = {{ recipes, fetchRecipes, loading}}>
            {children}
        </RecipeContext.Provider>
    );
};

export default RecipeProvider;