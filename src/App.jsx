import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Background Elements */}
      <div className="floating-icons">
        <div className="floating-icon">⚙️</div>
        <div className="floating-icon">🐳</div>
        <div className="floating-icon">☁️</div>
        <div className="floating-icon">🔧</div>
        <div className="floating-icon">📊</div>
        <div className="floating-icon">🚀</div>
      </div>

      <Particles
        className="particles"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } }
          },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#ffffff", distance: 150 },
            move: { enable: true, speed: 2 },
            number: { density: { enable: true, area: 800 }, value: 50 },
            size: { value: 3 }
          },
          detectRetina: true
        }}
      />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">JR</Link>
          
          <div className="nav-menu">
            <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
              Home
            </Link>
            <Link to="/about" className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>
              About
            </Link>
            <Link to="/skills" className={location.pathname === '/skills' ? 'nav-link active' : 'nav-link'}>
              Skills
            </Link>
            <Link to="/projects" className={location.pathname === '/projects' ? 'nav-link active' : 'nav-link'}>
              Projects
            </Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}>
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Routes with Animations */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;