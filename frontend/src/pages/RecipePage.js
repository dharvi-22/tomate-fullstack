import { useContext, useRef, useState } from "react";
import { RecipeContext } from "../context/recipeContext";
import { useParams, useNavigate } from "react-router-dom";
import leftButton from "../assets/left-button.svg";
import rightButton from "../assets/right-button.svg";
import { Link } from "react-router-dom";


import "../styles/recipePage.scss";

const RecipePage = () => {
    //extracts id parameter from url
    const {id} =useParams();

    //access the recipes array from recipe context
    const {recipes} = useContext(RecipeContext);

    //hook to navigate between pages
    const navigate = useNavigate();

    //find the specific recipe from context - matching the id
    const recipe = recipes.find((r) => r.id.toString() === id);

    //state to track the selected serving size, default to 2
    const [selectedServings, setSelectedServings] = useState(1);

    //function to update the selected serving size when toggled
    const handleToggle = (serving) => {
        setSelectedServings(serving);
    };

    //scrolling the carousel by buttons
    const carouselRef = useRef(null);

    const scroll = (direction) => {
        const scrollAmount = 300;
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="recipe-page">

            {/* renders if the recipe exist */}
            { recipe ? (
                <>
                    <div className="recipe-header">
                        <img src={recipe.image} alt={recipe.title}/>
                        {/* Breadcrumb Back Button */}
                        <button className={`back-button ${!recipe ? "not-found" : ""}`} onClick={() => navigate(-1)}>❮  Back</button>
                        <h1>{recipe.title}</h1>
                    </div>

                    {/* cook time details */}
                    <div className="cook-time"> 
                        <div>
                            <strong>Prep Time</strong>
                            <p>5 minutes</p>
                        </div>
                        <div>
                            <strong>Cook Time</strong>
                            <p>7 minutes</p>
                        </div>
                        <div>
                            <strong>Total Time</strong>
                            <p>12 minutes</p>
                        </div>
                    </div>

                    <div className="r-background">
    
                        <div className="recipe-details">

                            <div className="left-column">
                                <div className="serving-size">
                                    <h3>Ingredients</h3>
                                    <p>Serves</p>
                                    <div className="toggle">
                                        {[1,2,3,4].map((num) => (
                                            <button key={num} className={selectedServings === num ? "selected":""}
                                                onClick={() => handleToggle(num)}>
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {/* ingredients checkbox list */}
                                <div className="ingredients">
                                    <div role="group" aria-labelledby="ingredients-list">
                                        {["1 Egg", "1 Avocado", "4 slices of bread", "1 tbsp mayonnaise", "Basil leaves"].map((item, index) => (
                                            <label key={index}>
                                                <input type="checkbox" />
                                                {item}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
    
                            {/* directions */}
                            <div className="directions">
                                <h3>Directions</h3>
                                <p><strong>Step 1:</strong> Boil the eggs and toast the bread.</p>
                                <p><strong>Step 2:</strong> Mash the avocado, spread it on the toast.</p>
                                <p><strong>Step 3:</strong> Add the egg slices and enjoy!</p>
                            </div>
                        </div>
    
                        {/* scrollable recipe carousel */}
                        <h3>You may also like...</h3>
                            <div className="recipe-carousel" ref={carouselRef}>
                                {recipes
                                    .filter((r) => r.id !== recipe.id)
                                    .slice(0,6)
                                    .map((r) => (
                                        <Link key ={r.id} to={`/recipe/${r.id}`} className="carousel-item">
                                            <img src={r.image} alt={r.title}/>
                                            <p>{r.title}</p>
                                        </Link>
                                ))}
                            </div>
                            <div className="carousel-buttons">
                                <button onClick={() => scroll("left")} aria-label="Scroll left">
                                    <img src={leftButton} alt="left arrow" />
                                </button>
                                <button onClick={() => scroll("right")} aria-label="Scroll right">
                                    <img src={rightButton} alt="left arrow" />
                                </button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Recipe not found.</p>
            )}
        </div>
    );
};


export default RecipePage;