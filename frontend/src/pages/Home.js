import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Icon} from "../assets/t-icon.svg";
import background from "../assets/background-1.svg";
import pastaImg from "../assets/pasta.png";
import pizzaImg from "../assets/pizza.png";
import chiliIcon from "../assets/chili.svg";
import pepper from "../assets/pepper.svg";
import peasnap from "../assets/peasnap.svg";
import brocoli from "../assets/brocoli.svg";
import onion from "../assets/onion.svg";
import tomatoo from "../assets/tomatooo.svg";
import mushroom from "../assets/mushroom.svg";

import "../styles/home.scss";

const Home = () => {
  return(
    <>
    {/* search by category card*/}
    <div className="hero-container">
        <img src={background} alt="circular-background" className="hero-background"/>
        <Link to="/explore" className="home-button">Explore Recipes</Link>
        <h1>Cooking made easy. <br />
          Quick, adjustable and helpful <br />
          recipes at your fingertips.
        </h1>
        <p className="hero-p">Find tasty recipes that suite your portion size.</p>

      {/* meal match card*/}
      <div className="hero-cards">
        <div className="hero-card">
          <img src={pizzaImg} alt="pizza" className="recipe-img" />
            <Link to="/meal-match" className="hero-card-text">
                <h3>Meal Match</h3>
                <p>Quickly browse through a set of recipes and swipe right to pick your match of the day.</p>
            </Link>
        </div>
      
      {/* search by category card*/}
      <div className="hero-card">
          <img src={pastaImg} alt="pasta" className="recipe-img"/>
            <Link to="/explore" className="hero-card-text">
                <h3>Search by Category</h3>
                <p>Explore through our delicious catalogue based on popular categories.</p>
            </Link>
      </div>
      </div>
      <div className="hero-icon"> 
        <Icon/>
      </div>
    </div>
   
    <div className="carousel-container">
      <div className="carousel-track">
          <img src={chiliIcon} alt="chili"/>
          <img src={mushroom} alt="mushroom"/>
          <img src={pepper} alt="pepper"/>
          <img src={peasnap} alt="pea-snap"/>
          <img src={brocoli} alt="brocoli"/>
          <img src={tomatoo} alt="tomatoes on vine"/>
          <img src={onion} alt="onion"/>

          <img src={chiliIcon} alt="chili"/>
          <img src={mushroom} alt="mushroom"/>
          <img src={pepper} alt="pepper"/>
          <img src={peasnap} alt="pea-snap"/>
          <img src={brocoli} alt="brocoli"/>
          <img src={tomatoo} alt="tomatoes on vine"/>
          <img src={onion} alt="onion"/>

          <img src={chiliIcon} alt="chili"/>
          <img src={mushroom} alt="mushroom"/>
          <img src={pepper} alt="pepper"/>
          <img src={peasnap} alt="pea-snap"/>
          <img src={brocoli} alt="brocoli"/>
          <img src={tomatoo} alt="tomatoes on vine"/>
          <img src={onion} alt="onion"/>

          <img src={chiliIcon} alt="chili"/>
          <img src={mushroom} alt="mushroom"/>
          <img src={pepper} alt="pepper"/>
          <img src={peasnap} alt="pea-snap"/>
          <img src={brocoli} alt="brocoli"/>
          <img src={tomatoo} alt="tomatoes on vine"/>
          <img src={onion} alt="onion"/>
        </div>
      </div>
    </>
  );
};

export default Home;