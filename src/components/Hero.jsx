import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <div className="hero-badge">Hungry?</div>
        <h1 className="hero-headline">JUST COME TO FOODIED & ORDER.</h1>
        <p className="hero-subtext">
          Here You Will Find All The Best Quality And Pure Food. Order Now To Satisfy Your Hunger Pangs.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Order now.</button>
          <button className="btn-secondary">
            Explore More
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="hero-decorative-circles">
        <div className="circle circle-large"></div>
        <div className="circle circle-medium"></div>
        <div className="circle circle-small circle-1"></div>
        <div className="circle circle-small circle-2"></div>
        <div className="circle circle-small circle-3"></div>
        <div className="circle circle-small circle-4"></div>
      </div>
    </section>
  );
};

export default Hero;
