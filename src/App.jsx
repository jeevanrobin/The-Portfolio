import React, { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { Typewriter } from "react-simple-typewriter";
import { useInView } from "react-intersection-observer";
import { Link } from "react-scroll";

import "./App.css";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 250);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const homeElement = document.getElementById('home');
    if (homeElement) {
      homeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        background: 'rgba(0, 212, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        color: '#00d4ff',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: 9999,
        boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = 'rgba(0, 212, 255, 0.2)';
        e.target.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.5)';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'rgba(0, 212, 255, 0.1)';
        e.target.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      ↑
    </button>
  );
}

function AnimatedSection({ children, className = "", animation = "scroll-animate" }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div ref={ref} className={`${className} ${animation} ${inView ? 'animate-in' : ''}`}>
      {children}
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }
      
      let currentSection = 'home';
      let maxVisibility = 0;
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(rect.height, viewportHeight - rect.top);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibility = visibleHeight / viewportHeight;
          
          if (visibility > maxVisibility && visibility > 0.3) {
            maxVisibility = visibility;
            currentSection = sectionId;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = sectionId === 'home' ? 0 : element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <button className="nav-logo" onClick={() => { const el = document.getElementById('home'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }}>
          JR
        </button>
        
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <button 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => { const el = document.getElementById('home'); if(el) el.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => { const el = document.getElementById('about'); if(el) el.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
            >
              About
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => { const el = document.getElementById('skills'); if(el) el.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
            >
              Skills
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => { const el = document.getElementById('projects'); if(el) el.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
            >
              Projects
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => { const el = document.getElementById('contact'); if(el) el.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
            >
              Contact
            </button>
          </li>
        </ul>
        
        <div 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <div className="gradient-bg"></div>
      <div className="tech-grid"></div>
      
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

      <Navbar />

      <div id="home">
        <header className="hero">
          <h1 className="fade-in">
            <Typewriter
              words={[
                "Hello, I'm Jeevan Reddy Medida",
                "GCP DevOps Engineer",
                "Senior Risk Consultant at EY",
                "Cloud & Automation Expert"
              ]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>
          <p className="fade-in delay-1s">
            7+ years IT experience | 5.5+ years DevOps specialization | GCP Expert
          </p>
        </header>
      </div>

      <div id="about">
        <AnimatedSection className="about" animation="slide-left">
          <h2>About Me</h2>
          <p>
            Currently serving as a Senior Risk Consultant at EY (Ernst & Young) since June 2024, 
            with 7+ years of IT experience and 5.5+ years specializing in DevOps engineering. 
            Expert in automation, configuration management, CI/CD, and cloud-native application 
            delivery on Google Cloud Platform (GCP). Strong hands-on expertise in designing, 
            deploying, and managing scalable solutions including GKE, Cloud Build, Terraform, 
            and comprehensive monitoring with Stackdriver and Grafana.
          </p>
        </AnimatedSection>
      </div>

      <div id="skills">
        <AnimatedSection className="skills">
          <h2>Skills & Expertise</h2>
          <div className="skills-grid">
            <AnimatedSection className="skill-card" animation="slide-left">
              <h3>Google Cloud Platform</h3>
              <p>Compute Engine, GKE, Cloud Storage, VPC, IAM, Pub/Sub, Cloud Functions, Cloud SQL, BigQuery, Cloud Load Balancing, Filestore, Cloud DNS, Secret Manager, Cloud Monitoring, Cloud Logging, KMS</p>
            </AnimatedSection>
            <AnimatedSection className="skill-card">
              <h3>DevOps & CI/CD Tools</h3>
              <p>Jenkins, Cloud Build, Git, GitHub, GitLab, Maven, SonarQube, Ansible, Shell Scripting, Python</p>
            </AnimatedSection>
            <AnimatedSection className="skill-card" animation="slide-right">
              <h3>Infrastructure & Monitoring</h3>
              <p>Terraform, Deployment Manager, Docker, Kubernetes (GKE), Cloud Monitoring (Stackdriver), Prometheus, Grafana, Cloud Logging</p>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>

      <div id="projects">
        <AnimatedSection className="projects">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            <AnimatedSection className="project-card" animation="slide-left">
              <h3>GCP Infrastructure Automation</h3>
              <p>
                Implemented Infrastructure as Code using Terraform and Deployment Manager 
                to automate resource provisioning on GCP. Configured end-to-end delivery 
                pipelines using Git, Maven, Jenkins, and Cloud Build with webhook integration 
                for continuous deployment.
              </p>
            </AnimatedSection>
            <AnimatedSection className="project-card">
              <h3>Container Orchestration & CI/CD</h3>
              <p>
                Designed multi-stage Docker builds and orchestrated workloads at scale 
                with Kubernetes (GKE). Implemented robust CI/CD pipelines using Jenkins 
                and Cloud Build, with automated build, test, and deployment processes 
                for cloud-native applications.
              </p>
            </AnimatedSection>
            <AnimatedSection className="project-card" animation="slide-right">
              <h3>Monitoring & Security Implementation</h3>
              <p>
                Established comprehensive monitoring and observability using Cloud Monitoring 
                (Stackdriver), Prometheus, and Grafana. Implemented security best practices 
                with GCP IAM, Secret Manager, and role-based access controls for enterprise 
                environments.
              </p>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>

      <div id="contact">
        <AnimatedSection className="contact">
          <h2>Let's Connect</h2>
          <div className="contact-info">
            <div className="contact-item">
              <strong>Email</strong><br />
              medidajeevanreddy499@gmail.com
            </div>
            <div className="contact-item">
              <strong>Phone</strong><br />
              +91 8309823797
            </div>
            <div className="contact-item">
              <strong>Location</strong><br />
              Hyderabad, India
            </div>
          </div>
        </AnimatedSection>
      </div>

      <ScrollToTopButton />
    </div>
  );
}

export default App;