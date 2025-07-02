//form page - input validation
import React, { useState } from "react";

import {ReactComponent as Mushroom } from "../assets/mushroom.svg";
import {ReactComponent as Beet } from "../assets/beet.svg";
import {ReactComponent as Brocoli } from "../assets/brocoli.svg";
import {ReactComponent as Carrot } from "../assets/carrot.svg";
import {ReactComponent as Chili } from "../assets/chili.svg";
import {ReactComponent as Peasnap } from "../assets/peasnap.svg";
import {ReactComponent as Tomato } from "../assets/tomato.svg";

import "../styles/form.scss";

const RecipeForm =() =>{

    const [recipeName, setRecipeName] = useState("");
    const [category, setCategory] = useState("");
    const [recipeLink, setRecipeLink] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // categories
    const categories = ["Breakfast", "Lunch", "Dinner", "Gluten-free", "Vegan"];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!recipeName || !category){
            setError("Please enter a recipe name and pick a category");
            setSuccess("")
        } else {
            setError("");
            setSuccess("Success! We've got your request and we will review it shortly!");
            //submission logic 

            //reset form fields after successful submission
            setRecipeName("");
            setCategory("");
            setRecipeLink("");
            setIngredients("");
        }
    };

    return (
        <div className="form-container">
            <h2>Request a Recipe</h2>
            <p>We are actively looking to expand our catalogue! If you have a recipe in mind that you'd like us to adapt, please share it with us. Simply fill out the form below as thoroughly as possible, and we'll do our best to incorporate it into our collection!</p>

            <form onSubmit={handleSubmit} className="form-group">
                <input type= "text" placeholder="Recipe Name" value={recipeName} onChange={(e) => setRecipeName (e.target.value)}/>
                
                {/* category dropdown */}
                <div className ="form-dropdown">
                    <select value= {category} 
                    onChange={(e) => setCategory(e.target.value)} className="custom-dropdown">
                        <option value="" disabled>Select a Category</option>
                        {categories.map((cat)=>(
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <p>Share a recipe link or alternatively, fill out at least 5 ingredients.</p>

                <input type="text" placeholder="Recipe Link (Optional)" value={recipeLink} onChange={(e) => setRecipeLink(e.target.value)}/>
                <textarea placeholder="Ingredients" rows="4" value={ingredients} onChange={(e) => setIngredients(e.target.value)}></textarea>
                
                {/* Success Message */}
                {success && <p className="outcome">{success}</p>}

                {/* Error Message */}
                {error && <p className="outcome">{error}</p>}

                {/* submit button */}
                <button type="submit" className="red-button">Submit</button>
            </form>
            <div className="form-illustrations">
                <Carrot className="svg-1"/>
                <Mushroom className="svg-2"/>
                <Brocoli className="svg-3"/>
                <Tomato className="svg-4"/>
                <Beet className="svg-5"/>
                <Chili className="svg-6"/>
                <Peasnap className="svg-7"/>

            </div>
        </div>

    );
};

export default RecipeForm;