import React from "react";
import "../styles/Home.css";

function Home() {
    return (
        <div className="hero-container">
            {/* Left Side: Text Content */}
            <div className="hero-text">
                <h1 className="hero-title">Heal Your Relationship with Food</h1>
                <p className="hero-subtitle">
                    Work with Coach Asmaa to develop a healthier mindset and overcome eating struggles.
                </p>
            </div>

            {/* Right Side: Coach Image */}
            <div className="hero-image">
                <img src="/asmaa.png" alt="Coach Asmaa" />
            </div>
        </div>
    );
}

export default Home;
