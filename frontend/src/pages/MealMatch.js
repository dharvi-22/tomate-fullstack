import React from "react";
import "../styles/mealMatch.scss";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { RecipeContext } from "../context/recipeContext"; 
import viewButton from "../assets/view-button.svg";
import leftButton from "../assets/left-button.svg";
import { useSwipeable } from "react-swipeable"; 


const MealMatch = () => {
    const { recipes, fetchRecipes } = useContext(RecipeContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showGame, setShowGame] = useState(false);

    const [mealType, setMealType] = useState("");
    const [dietaryPreference, setDietaryPreference] = useState("");

    const navigate = useNavigate();

    //play button only to be active when both filters are selected
    const filtersSelected = mealType && dietaryPreference;

    //function to start the game
    const startGame = () => {
        fetchRecipes("", mealType, dietaryPreference, "");
        setShowGame(true);
        setCurrentIndex(0);
    };

    //move to the next recipe card
    const nextRecipe = () =>{
        if (recipes.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
        }
    };

    //navigate to recipe details
    const viewRecipe = () => {
        if (recipes.length > 0) {
            navigate(`/recipe/${recipes[currentIndex].id}`);
        }
    };

    //hooks for swipeable function
    const handlers = useSwipeable({
        onSwipedLeft: () => nextRecipe(),
        onSwipedRight: () => viewRecipe(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true, // allows swipe using mouse too
    });


    return (
    <div className="match-container">
        <h1>Meal Match</h1>
        <h2>Ready to meet your match?</h2>
        <p>Browse quickly through our recipes catalogue to find the meal that matches your taste-buds and mood! 
        Simply swipe left for more or right to view the recipe in more detail. Pick your vibe and find your recipe soulmate..</p>

        {/* dropdown filters */}
        <div className="filters-container">
            <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
                <option value="">Select Meal Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="side dish">Lunch</option>
                <option value="main course">Dinner</option>
                <option value="dessert">Dessert</option>
                <option value="snack">Snack</option>
            </select>

            <select value={dietaryPreference} onChange={(e) => setDietaryPreference(e.target.value)}>
                <option value="">Select Diet Type</option>
                <option value="pescetarian">Pescatarian</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="gluten free">Gluten-free</option>
            </select>
        </div>
        
        {/* play button */}
        <button className={`play-button ${filtersSelected ? "active" : "disabled"}`} onClick={startGame} disabled={!filtersSelected}>Play Meal Match</button>

        {/* condition if te recipes are greater than 0*/}
        {showGame && recipes.length > 0 && (
            <div className="meal-container">
                    {/* swipe function using react swipe library */}
                    <div {...handlers} className="swipe-wrapper">
                        <div className="meal-card">
                            <img src={recipes[currentIndex].image} alt={recipes[currentIndex].title}/>
                            <div className="meal-info">
                                <h3>{recipes[currentIndex].title}</h3>
                                <p>Total Cook Time: 20 minutes</p>
                                <p>Total Ingredients: 8</p>
                            </div>
                        </div>
                    </div>

                    <div className="button-group">
                        <button className="left-button" onClick={nextRecipe}>
                            <img src={leftButton} alt="left arrow to view next recipe"/>
                        </button>
                        <button className="right-button" onClick={viewRecipe}>
                            <img src={viewButton} alt="heart button to view recipe"/>
                        </button>
                    </div>
            </div>
        )}
    </div>
    );
};
  
export default MealMatch;