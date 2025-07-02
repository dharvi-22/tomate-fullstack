//maps through the recipes state and displays each recipe's image and name.

import { useState, useEffect } from "react";
import {useContext} from "react";
import {RecipeContext} from "../context/recipeContext";
import { Link } from "react-router-dom";
import "../styles/recipeList.scss";

const RecipeList = () =>{
    //get recipes and loading state
    const { recipes, loading} = useContext(RecipeContext);
    //default mobile show 6 recipes
    const [visibleCount, setVisibleCount] = useState(6);

    //update visible count based on screen size
    useEffect(() => {
        const updateVisibleCount = ()=>{
            //desktop show all 12 recipe cards
            if (window.innerWidth >= 1024) {
                setVisibleCount(12);
            //tablet show 9
            } else if (window.innerWidth >= 768) {
                setVisibleCount(9); 
            //mobile show 6
            } else {
                setVisibleCount(6);
            }
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);

        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    //load more recipes adds 1 row
    const handleLoadMore = () => {
        if (window.innerWidth >= 1024) {
        //desktop load 4 more
            setVisibleCount((prev) => prev + 4);
        //tablet load 3 more
        } else if (window.innerWidth >= 768) {
            setVisibleCount((prev) => prev + 3);
        //mobile load 2 more
        } else {
            setVisibleCount((prev) => prev + 2);
        }
    };

    return (
        <div className="recipe-grid">
            {recipes.slice(0, visibleCount).map((recipe) => ( 
                <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-card">
                    <img src={recipe.image} alt={recipe.title}/>
                    <p>{recipe.title}</p>
                </Link>
            ))}
            <div className="load-more-container">
                {visibleCount <= recipes.length && (
                    <button className= "load-more" onClick={handleLoadMore}>
                        view more
                     </button>
                )}
            </div> 
        </div>
    );
};

export default RecipeList;