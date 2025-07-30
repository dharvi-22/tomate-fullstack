import { useContext, useEffect, useRef, useState } from "react";
import { RecipeContext } from "../context/recipeContext";
import { useParams, useNavigate } from "react-router-dom";
import leftButton from "../assets/left-button.svg";
import rightButton from "../assets/right-button.svg";
import { Link } from "react-router-dom";


import "../styles/recipePage.scss";

//function to round values to nearest kitchen measurements
const formatAmount = (value, unit) => {
    // Round to nearest 0.25 for common kitchen measurements
    const rounded = Math.round(value * 4) / 4;

    // Map decimals to friendly fractions
    const fractionMap = {
        0.25: "¼",
        0.33: "⅓",
        0.5: "½",
        0.66: "⅔",
        0.75: "¾",
    };

    const whole = Math.floor(rounded);
    const decimal = +(rounded - whole).toFixed(2);

    let fraction = fractionMap[decimal] || "";

    if (whole === 0 && fraction) return `${fraction}`;
    if (whole > 0 && fraction) return `${whole} ${fraction}`;
    return `${rounded}`; // fallback if no matching fraction
};

const RecipePage = () => {
    //extracts id parameter from url
    const {id} =useParams();
    //access the recipes array from recipe context
    const {recipes} = useContext(RecipeContext);
    //hook to navigate between pages
    const navigate = useNavigate();

    //find the specific recipe from context - matching the id
    //const recipe = recipes.find((r) => r.id.toString() === id);

    //store full recipe info from API
    const [recipeDetails, setRecipeDetails] = useState(null);
    //state to track the selected serving size, default to 2
    const [selectedServings, setSelectedServings] = useState(1);
    //scrolling the carousel by buttons
    const carouselRef = useRef(null);

    const API_KEY = process.env.REACT_APP_API_KEY;

    //fetch full recipe info from spoonacular when component mounts or ID changes
    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
                );
                const data = await response.json();
                setRecipeDetails(data);// save detailed recipe
                setSelectedServings(data.servings || 1);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };
        fetchRecipeDetails();
    }, [id, API_KEY]);

    //handle user selecting a serving size 
    const handleToggle = (serving) => {
        setSelectedServings(serving);
    };

    //scroll carousel left or right
    const scroll = (direction) => {
        const scrollAmount = 300;
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    //fallback to basic recipe info from context if fetch fails or is delayed
    const fallbackRecipe = recipes.find((r) => r.id.toString() === id);

    //show loading while waiting for API response
    if (!recipeDetails && !fallbackRecipe) {
        return <p>Loading recipe...</p>;
    } 

    //extract required fields from API data or fallback
    const {
        title,
        image,
        readyInMinutes,
        extendedIngredients =[],
        analyzedInstructions =[],
        servings: originalServings = 1,
    } = recipeDetails || fallbackRecipe;

    //calculate multiplier for adjusting ingredients based on servings 
    const ingredientMultiplier = selectedServings / originalServings;

    return (
        <div className="recipe-page">
            {/* Header with image, title, back button */}
            <div className="recipe-header">
                <img src={image} alt={title} />
                <button className="back-button" onClick={() => navigate(-1)}> ❮ Back </button>
                <h1>{title}</h1>
            </div>

            {/* Display total cooking time */}
            <div className="cook-time">
                <div>
                <p>Total Time: {readyInMinutes} minutes </p>
                </div>
            </div>

            <div className="r-background">
                <div className="recipe-details">
                    {/* Left column with servings + ingredients */}
                    <div className="left-column">
                        <div className="serving-size">
                            <h3>Ingredients</h3>
                            <p>Serves</p>
                            <div className="toggle">
                                {[1, 2, 3, 4].map((num) => (
                                    <button
                                        key={num}
                                        className={selectedServings === num ? "selected" : ""}
                                        onClick={() => handleToggle(num)}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ingredients list with checkbox */}
                        <div className="ingredients" role="group" aria-labelledby="ingredients-list">
                            {extendedIngredients.length > 0 ? (
                                extendedIngredients.map((ingredient, index) => (
                                    <label key={index}>
                                        <input type="checkbox" />
                                        <span>
                                            {`${formatAmount(ingredient.amount * ingredientMultiplier, ingredient.unit)} ${ingredient.unit} ${ingredient.name}`}
                                        </span>
                                    </label>
                                ))
                            ) : (
                                <p>No ingredients found.</p>
                            )}
                        </div>
                    </div>

                    {/* Directions / Steps on the right */}
                    <div className="directions">
                        <h3>Directions</h3>
                        {analyzedInstructions.length > 0 && analyzedInstructions[0].steps.length > 0 ? (
                            analyzedInstructions[0].steps.map((step) => (
                                <p key={step.number}>
                                    <strong>Step {step.number}:</strong> {step.step}
                                </p>
                            ))
                        ) : (
                            <p>No directions provided.</p>
                        )}
                    </div>
                </div>

                {/* Related recipes carousel */}
                <h3>You may also like...</h3>
                <div className="recipe-carousel" ref={carouselRef}>
                    {recipes
                        .filter((r) => r.id.toString() !== id)
                        .slice(0, 12)
                        .map((r) => (
                            <Link key={r.id} to={`/recipe/${r.id}`} className="carousel-item">
                                <img src={r.image} alt={r.title} />
                                <p>{r.title}</p>
                            </Link>
                        ))}
                </div>

                {/* Scroll buttons for carousel */}
                <div className="carousel-buttons">
                    <button onClick={() => scroll("left")} aria-label="Scroll left">
                        <img src={leftButton} alt="left arrow" />
                    </button>
                    <button onClick={() => scroll("right")} aria-label="Scroll right">
                        <img src={rightButton} alt="right arrow" />
                    </button>
                </div>
            </div>
        </div>
    );
};


export default RecipePage;