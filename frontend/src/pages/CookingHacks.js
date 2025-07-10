import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import chiliIcon from "../assets/chili.svg";
import pepper from "../assets/pepper.svg";
import peasnap from "../assets/peasnap.svg";
import brocoli from "../assets/brocoli.svg";
import onion from "../assets/onion.svg";
import tomatoo from "../assets/tomatooo.svg";
import leftButton from "../assets/left-button.svg";
import rightButton from "../assets/right-button.svg";
import "../styles/cookingHacks.scss"; 


const CookingHacks =() => {
    const [batchHacks, setBatchHacks] = useState([]);
    const [freezerHacks, setFreezerHacks] = useState([]);
    const [batchIndex, setBatchIndex] = useState(0);
    const [freezerIndex, setFreezerIndex] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/api/hacks`)
         .then(res => res.json())
         .then(data => {
            //sort hacks by most recent (highest id)
            const sortedHacks = data.sort((a,b) => b.id - a.id);

            //filter by category after sorting
            setBatchHacks(sortedHacks.filter(h => h.category === 'batch'));
            setFreezerHacks(sortedHacks.filter(h => h.category === 'freezer'));
         });
    }, []);

    //carousel structure
    const scrollAmount = 3;

    //next buttons
    const handleBatchNext = () => {
        setBatchIndex((prev) => (prev + scrollAmount) % batchHacks.length);
    };
    const handleFreezerNext = () => {
        setFreezerIndex((prev) => (prev + scrollAmount) % freezerHacks.length);
    };
    
    //previous buttons
    const handleBatchPrev = () => {
        setBatchIndex((prev) => (prev - scrollAmount + batchHacks.length) % batchHacks.length);
    };
    const handleFreezerPrev = () => {
        setFreezerIndex((prev) => (prev - scrollAmount + freezerHacks.length) % freezerHacks.length);
    };

    const renderCards = (items, index) => {
        const visible = items.slice(index, index + scrollAmount);
        return visible.map((item, i) => (
            <div className="hack-card" key={i}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className="tip-box"><p>{item.tip}</p></div>
            </div>
        ));
    };

    return(
         <>
        {/* Header section remains */}
        <div className="hacks-header">
            <h1>Cooking Hacks</h1>
            <h2>Cooking made easy...</h2>
            <p> Swift through our range of tips and tricks in the kitchen. From batch cooking to small additions that makes the meal!</p>
        {/* Icons container */}
         <div className="hacks-icons">
            <img src={chiliIcon} alt="chili" />
            <img src={pepper} alt="pepper" />
            <img src={peasnap} alt="pea-snap" />
            <img src={tomatoo} alt="tomatoes on vine" />
            <img src={brocoli} alt="broccoli" />
            <img src={onion} alt="onion" />
        </div>
        </div>

        {/* Carousel sections container */}
        <div className="hacks-container">
        {/* Batch Carousel */}
        <section className="hacks-section">
            <h3>Batch Cooking</h3>
            <h4>Cook it once eat it twice!</h4>
            <div className="hacks-carousel">
                <button className="prev" onClick={handleBatchPrev}>
                    <img src={leftButton} alt="Previous" />
                </button>
            <div className="h-carousel">{renderCards(batchHacks, batchIndex)}</div>
                <button className="next" onClick={handleBatchNext}>
                    <img src={rightButton} alt="Next" />
                </button>
            </div>
        </section>

       {/* Freezer Carousel */}
       <section className="hacks-section">
           <h3>Freezer Hacks</h3>
           <h4>Boost your meals with frozen goodies...</h4>
            <div className="hacks-carousel">
                <button className="prev" onClick={handleFreezerPrev}>
                    <img src={leftButton} alt="Previous" />
                </button>
            <div className="h-carousel">{renderCards(freezerHacks, freezerIndex)}</div>
                <button className="next" onClick={handleFreezerNext}>
                    <img src={rightButton} alt="Next" />
                </button>
            </div>
        </section>
     </div>
  </>
 );
};

export default CookingHacks;