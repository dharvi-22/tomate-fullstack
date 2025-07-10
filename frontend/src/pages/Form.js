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


const HackForm = () => {
    const [title, setTitle] = useState ("");
    const [description, setDescription] = useState("");
    const [tip, setTip] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title || !description || !category) {
            setError("Please fill in the title, description, and category.");
            setSuccess("");
            return;
        }

        try{
            const response = await fetch("http://localhost:5000/api/hacks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    description,
                    tip,
                    category
                })
            });

            if(!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            setSuccess("Thank you! Your cooking hack has been added.");
            setError("");
            setTitle("");
            setDescription("");
            setTip("");
            setCategory("");
         } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
            setSuccess("");
         }
    };

    return (
        <div className="form-container">
            <h2>Share a Cooking Hack</h2>
            <p>Help others improve their meal prep game by sharing a cooking tip or hack!</p>

        <form onSubmit={handleSubmit} className="form-group">
        <input type="text" placeholder="Hack Title" value={title} onChange={(e) => setTitle(e.target.value)}/>

        <textarea placeholder="Description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <textarea placeholder="Optional Tip" rows="3" value={tip} onChange={(e) => setTip(e.target.value)}></textarea>

        {/* Category dropdown */}
        <div className="form-dropdown">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="custom-dropdown">
            <option value="" disabled>Select a Category</option>
            <option value="batch">Batch</option>
            <option value="freezer">Freezer</option>
          </select>
        </div>

        {/* Success & Error */}
        {success && <p className="outcome">{success}</p>}
        {error && <p className="outcome">{error}</p>}

        <button type="submit" className="red-button">Submit</button>
       </form>

      {/* svg illustrations */}
      <div className="form-illustrations">
        <Carrot className="svg-1" />
        <Mushroom className="svg-2" />
        <Brocoli className="svg-3" />
        <Tomato className="svg-4" />
        <Beet className="svg-5" />
        <Chili className="svg-6" />
        <Peasnap className="svg-7" />
      </div>
    </div>

    );
};

export default HackForm;