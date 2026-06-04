import { motion } from "framer-motion";

export default function About() {
  const experiences = [
    {
      company: "EY LLP (Client: HSBC)",
      role: "GCP DevOps Engineer / Site Reliability Engineer (SRE)",
      period: "June 2024 – Present",
      color: "#FFD700"
    },
    {
      company: "HCL Tech",
      role: "DevOps Engineer & SRE",
      period: "June 2021 – June 2023",
      color: "#FFA500"
    },
    {
      company: "Smartried Technologies",
      role: "DevOps Engineer",
      period: "June 2017 – May 2021",
      color: "#FF8C00"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="page"
    >
      <div className="about">
        <h2>About Me</h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Having <strong>8+ years of IT experience</strong> and <strong>6.5+ years as a DevOps Engineer / Site Reliability Engineer (SRE)</strong>,
          with expertise in Build & Release Management, Configuration Management, Google Cloud Platform (GCP),
          Containerization, and Infrastructure Automation. Currently working as a <strong>GCP DevOps Engineer / SRE at EY LLP</strong> (Client: HSBC),
          ensuring system reliability, collaborating with development teams, and maintaining production stability.
          Skilled in GCP services, CI/CD pipelines, Kubernetes, Terraform, Docker, Ansible, and monitoring solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h3 style={{ color: "#FFD700", marginBottom: "1.2rem", marginTop: "2rem" }}>Professional Experience</h3>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              style={{
                borderLeft: `4px solid ${exp.color}`,
                padding: "0.9rem 1.5rem",
                marginBottom: "1rem",
                background: "rgba(255,215,0,0.05)",
                borderRadius: "0 8px 8px 0",
                textAlign: "left"
              }}
            >
              <h4 style={{ color: exp.color, margin: 0 }}>{exp.company}</h4>
              <p style={{ margin: "0.2rem 0", color: "#ccc", fontWeight: "500" }}>{exp.role}</p>
              <span style={{ color: "#888", fontSize: "0.85rem" }}>{exp.period}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ marginTop: "1.5rem" }}
        >
          <h3 style={{ color: "#FFD700", marginBottom: "0.8rem" }}>Education</h3>
          <div style={{
            borderLeft: "4px solid #FFD700",
            padding: "0.9rem 1.5rem",
            background: "rgba(255,215,0,0.05)",
            borderRadius: "0 8px 8px 0",
            textAlign: "left"
          }}>
            <h4 style={{ color: "#FFD700", margin: 0 }}>B.Tech – JNTU Hyderabad</h4>
            <p style={{ color: "#888", margin: "0.2rem 0", fontSize: "0.9rem" }}>2017 | 62%</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
