import React from "react";
import "./Hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import hero_image from "../Assets/hero_1.png"

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="welcome">
                    <p>YËLËP TEK SA KAW</p>
                    <p>FROM <span>NDAKARU</span></p>
                    <p>TO THE WORLD</p>
                </div>
                </div>
                <div className="hero-latest-btn">
                    <div>ORDER NOW</div>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
            <div className="hero-right">
                <img src={hero_image} alt="" />


            </div>
            


        </div>
    )
}

export default Hero;