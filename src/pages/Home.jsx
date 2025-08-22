import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <section className="home">
      <div className="home-content">
        <div className="home-left">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Typewriter
              options={{
                strings: ["Hello, I'm Jeevan Reddy 👋"],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 30,
                pauseFor: 2000,
              }}
            />
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="job-title"
          >
            <Typewriter
              options={{
                strings: [
                  "DevOps Engineer",
                  "Cloud Architect", 
                  "Automation Enthusiast",
                  "Senior Risk Consultant at EY",
                  "GCP | Kubernetes Expert",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 40,
              }}
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="tagline"
          >
            Transforming businesses with cloud-native solutions & DevOps excellence 🚀
          </motion.p>
          
          <motion.div
            className="hero-cta-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <Link to="/projects" className="btn primary glow">
              <i className="fas fa-rocket"></i>
              View My Projects
            </Link>
            <a href="mailto:medidajeevanreddy499@gmail.com?subject=Let's Work Together&body=Hi Jeevan, I'm interested in discussing opportunities." className="btn secondary glow">
              <i className="fas fa-handshake"></i>
              Hire Me
            </a>
          </motion.div>
          
          <motion.div
            className="social-media-icons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 1 }}
          >
            <a href="https://www.linkedin.com/in/medida-jeevan-reddy-2673aa176/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/jeevanrobin" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:medidajeevanreddy499@gmail.com" className="social-icon">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="tel:+918309823797" className="social-icon">
              <i className="fas fa-phone"></i>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="home-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 4, duration: 1 }}
        >

          <div className="navigation-cards">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/about" className="nav-card">
            <i className="fas fa-user"></i>
            <h3>About</h3>
            <p>Learn about my journey and experience</p>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.4, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/skills" className="nav-card">
            <i className="fas fa-cogs"></i>
            <h3>Skills</h3>
            <p>Explore my technical expertise</p>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.6, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/projects" className="nav-card">
            <i className="fas fa-rocket"></i>
            <h3>Projects</h3>
            <p>View my featured work and achievements</p>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/contact" className="nav-card">
            <i className="fas fa-envelope"></i>
            <h3>Contact</h3>
            <p>Get in touch for opportunities</p>
          </Link>
        </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}