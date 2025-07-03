import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.scss"; 
import whiteicon from '../assets/white-icon.svg';
import whitelogo from '../assets/white-logo.svg';

const Header =() => {
    return (
        <header className ="header" aria-label="Main Navigation">
            <nav className="nav" role="navigation" aria-labelledby="main-menu">
                {/*Logos Container*/}
                <div className="logos" aria-label="Tomato icons">
                   <Link to="/"><img src={whiteicon} alt="tomato icon" className="icon"></img></Link>
                   <Link to="/"><img src={whitelogo} alt="tomato logo" className="logo"></img></Link>
                </div>
                <ul className="nav-links">
                    <li><Link to="/cooking-hacks">Cooking Hacks</Link></li>
                    <li><Link to="/meal-match">Meal Match</Link></li>
                    <li className="silent"><Link to="/explore">Explore Recipes</Link></li>
                </ul>
            </nav>
      
        </header>
    );
};
export default Header 