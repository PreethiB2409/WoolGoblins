import React, { useState , useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import '../index.css';
import Header from "./Header";

function Home()
{
    const navigate = useNavigate();
    const location = useLocation();

    const showMenu = [
        "/archives", 
        "/homepage", 
        "/about",
        "/customs",
      ].includes(location.pathname);

    useEffect(() => {
    if (location.pathname === "/") {
      navigate("/homepage", { replace: true });
    }
  }, [location.pathname, navigate]);

    useEffect(() => {
      if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [location]);

    return (
      <div className="home-page">
        {showMenu && <Header />}
        <div className="floating-stars">
          {[...Array(2)].map((_, index) => (
            <img 
              key={index} 
              src="/BEAF2D85-2BD2-4D3C-8C4F-CDDFE2DC45BA.PNG" 
              alt="star" 
              className={`star star-${index + 1}`} 
            />
          ))}
        </div>
        <h1 className="hp-title">WoolGoblins</h1>
        <img src='/WGtransparent.png' className="hp-logo"/>
        <div className="about-section">
          <div>
            <h1 id="about" className="about-title">About WoolGoblins</h1>
            <p className="about-content">
              Wool Goblins is a small crochet business that creates handmade, high-quality pieces with care, precision, and personality. Every item is thoughtfully crafted by hand, with a focus on unique designs, soft textures, and fine details that make each piece stand out. The shop offers a variety of cozy crochet goods — from fun and functional keychains to plush toys, wearables, and custom orders tailored to your ideas. Whether you're looking for a small gift or a one-of-a-kind creation, Wool Goblins delivers charming, handcrafted pieces made to bring a little warmth and joy to your day.
            </p>
          </div>
        </div>
        <div className="archive-grid">
          <img src="1.jpg" alt="Image 1" />
          <img src="2.jpg" alt="Image 2" />
          <img src="3.jpg" alt="Image 3" />
          <img src="4.jpg" alt="Image 4" />
          <img src="5.jpg" alt="Image 5" />
          <img src="6.jpg" alt="Image 6" />
        </div>
        <div className="archives-nav-button">
          <button 
          onClick={() => navigate('/archives')}>
          Archives
          </button>
        </div>
        <div>
          <h1 className="customs-title">Want something custom made?
            <nav className="customs-nav">
            <Link to="/customs">Click Here!</Link>
          </nav>
          </h1>
        </div>
        <div id="contact" className="contact-container">
          <h2 className="contact-title">Contact Me</h2>
          <nav className="contact-nav">
            <Link to="https://www.instagram.com/apple_patxh?igsh=MXU1M2VmdWlraGlt">Instagram</Link><br />
            <Link to="mailto:youremail@example.com">Email-Id</Link>
          </nav>
          <p className="contact-number">Phone Number: 97425 99296</p>
          <img src="/BEAF2D85-2BD2-4D3C-8C4F-CDDFE2DC45BA.PNG" />
          <p className="made-by">Designed and developed by Preethi</p>
        </div>
    </div>
    );
  }

export default Home;