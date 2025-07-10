import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.scss";
import whitelogo from '../assets/white-logo.svg';

const Footer =() => {
    return(
        <footer className="footer" aria-label="footer navigation">
            <div className="footer-container">
                <Link to="/"><img src={whitelogo} alt="tomato logo" className="footer-logo"></img></Link>
                <p> Got a clever cooking hack to share?</p>
                <Link to="/hack-form" className="footer-button">Share it with us!</Link>
            </div>
            <div className="footer-text">
                <p>© Copyright Tomate 2025  |  Privacy Policy</p>
                <a href="mailto:info@tomate.com">info@tomate.com</a>
            </div>
        </footer>
    );
};

export default Footer 