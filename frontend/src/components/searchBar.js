//component to let user search by name or category using the context function

import { useState, useContext } from "react";
import { RecipeContext } from "../context/recipeContext";
import "../styles/searchBar.scss";

const SearchBar = () => {
    //store user input
    const [searchTerm, setSearchTerm] = useState("");
    //store selected category
    const [selectedCategory, setSelectedCategory] = useState("");
    //get the fetched function from context
    const { fetchRecipes } = useContext(RecipeContext);

    //function to trigger search
    const handleSearch = () => {
        fetchRecipes(searchTerm, selectedCategory);
    };
    // Ensure category search works without requiring search term
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);

        // Fetch only by category if no search term
        fetchRecipes("", category); 
    };

    return (
        <div className ="search-bar">
            <div className="search-container">
                {/* input for searching by recipe name */}
                <input type="text" placeholder="I am looking for..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button onClick={handleSearch}>➜</button>
            </div>
            {/* dropdown for selecting recipe category */}
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">I know the category...</option>
                <option value="breakfast">Breakfast</option>
                <option value="side dish">Lunch</option>
                <option value="main dish">Dinner</option>
                <option value="dessert">Dessert</option>
                <option value="salad">Gluten-Free</option>
            </select>
        </div>
    );
};


export default SearchBar;