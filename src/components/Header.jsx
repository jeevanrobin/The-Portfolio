import React from 'react';
import { Search, User } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="foodied-header">
      <div className="header-container">
        <div className="logo">FOODIED</div>
        
        <nav className="header-nav">
          <a href="#home" className="nav-item">Home</a>
          <a href="#menu" className="nav-item">Menu</a>
          <a href="#about" className="nav-item">About Us</a>
          <a href="#contact" className="nav-item">Contact</a>
        </nav>

        <div className="header-actions">
          <div className="header-icon">
            <Search size={20} />
          </div>
          <div className="header-icon">
            <User size={20} />
          </div>
          <button className="sign-up-btn">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
