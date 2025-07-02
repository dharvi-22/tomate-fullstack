import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.scss"; 
import icon from '../assets/t-icon.svg';
import logo from '../assets/t-logo.svg';

const Header =() => {
    return (
        <header className ="header" aria-label="Main Navigation">
            <nav className="nav" role="navigation" aria-labelledby="main-menu">
                {/*Logos Container*/}
                <div className="logos" aria-label="Tomato icons">
                   <Link to="/"><img src={icon} alt="tomato icon" className="icon"></img></Link>
                   <Link to="/"><img src={logo} alt="tomato logo" className="logo"></img></Link>
                </div>
                <ul className="nav-links">
                    <li><Link to="/explore">EXPLORE</Link></li>
                    <li><Link to="/meal-match">MEAL MATCH</Link></li>
                </ul>
            </nav>
      
        </header>
    );
};
export default Header 