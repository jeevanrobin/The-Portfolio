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
                strings: ["Hello, I am Jeevan Reddy"],
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
                  "Cloud Expert", 
                  "AWS | GCP | Kubernetes",
                  "Senior Risk Consultant at EY",
                  "Automation Enthusiast",
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
            Building reliable, scalable, and modern cloud solutions 🚀
          </motion.p>
        </div>

        <motion.div
          className="home-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
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