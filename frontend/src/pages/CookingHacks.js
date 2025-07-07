import React from "react";
import { Link } from "react-router-dom";
import chiliIcon from "../assets/chili.svg";
import pepper from "../assets/pepper.svg";
import peasnap from "../assets/peasnap.svg";
import brocoli from "../assets/brocoli.svg";
import onion from "../assets/onion.svg";
import tomatoo from "../assets/tomatooo.svg";

const CookingHacks =() => {
    return(
       <div className="hacks-container">
            <h1>Cooking Hacks</h1>
            <h2>Cooking made easy...</h2>
            <p>Swift through our range of tips and tricks in the kitchen. From batch cooking to small additions that makes the meal! </p>
            {/*icons container*/}
        <div className="hacks-icons">
            <img src={chiliIcon} alt="chili"/>
            <img src={pepper} alt="pepper"/>
            <img src={peasnap} alt="pea-snap"/>
            <img src={tomatoo} alt="tomatoes on vine"/>
            <img src={brocoli} alt="brocoli"/>
            <img src={onion} alt="onion"/>
        </div>
       </div>
    );
};

export default CookingHacks