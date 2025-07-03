//component to let user search by name or category using the context function

import { useState, useContext } from "react";
import { RecipeContext } from "../context/recipeContext";
import "../styles/searchBar.scss";

const SearchBar = () => {
    //store user input
    const [searchTerm, setSearchTerm] = useState("");
    //store selected category
    const [selectedCategory, setSelectedCategory] = useState("");
    //meal-type filter
    const [mealType, setMealType] = useState("");
    //diet filter
    const [dietaryPreference, setDietaryPreference] = useState("");
    //quick time filter
    const [quickFilter, setQuickFilter] = useState("");

    //get the fetched function from context
    const { fetchRecipes } = useContext(RecipeContext);

    //function to trigger search
    const handleSearch = () => {
        fetchRecipes(searchTerm, mealType, dietaryPreference, quickFilter);
    };
    // Ensure category search works without requiring search term
    const handleFilterChange = (setter) => (e) => {
        const value = e.target.value;
        setter(value);
        fetchRecipes(searchTerm,
                     setter === setMealType ? value : mealType, 
                     setter === setDietaryPreference ? value : dietaryPreference,
                     setter === setQuickFilter ? value : quickFilter);
    };

    // handle to clear filters
    const handleClearFilters = () => {
        setMealType('');
        setDietaryPreference('');
        setQuickFilter('');
    };
        // Fetch only by category if no search term
        //fetchRecipes("", category); 
    

    return (
        <div className ="search-bar">
            <div className="search-container">
                {/* input for searching by recipe name */}
                <input type="text" placeholder="I am looking for..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button onClick={handleSearch}>➜</button>
            </div>
            {/* filters below search bar */}
            <div className="filters-container">
                {/* meal type dropdown */}
                <select value={mealType} onChange={handleFilterChange(setMealType)}>
                    <option value="">Meal Type ⌄</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="side dish">Lunch</option>
                    <option value="main course">Dinner</option>
                    <option value="dessert">Dessert</option>
                    <option value="snack">Snack</option>
                </select>

                {/* diet preference dropdown */}
                <select value={dietaryPreference} onChange={handleFilterChange(setDietaryPreference)}>
                    <option value="">Dietary Preferences ⌄</option>
                    <option value="pescetarian">Pescatarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="gluten free">Gluten-free</option>
                </select>

                {/* quick & easy dropdown */}
                <select value={quickFilter} onChange={handleFilterChange(setQuickFilter)}>
                    <option value="">Quick and Easy ⌄</option>
                    <option value="maxReadyTime=20">20min meals</option>
                    <option value="one pot">One pot</option>
                </select>

                 <button className="clear-btn" onClick={handleClearFilters}>
                    Clear Filters
                 </button>
            </div>
        </div>
    );
};


export default SearchBar;