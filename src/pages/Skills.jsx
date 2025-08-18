import { motion } from "framer-motion";

export default function Skills() {
  const skillCards = [
    {
      title: "Google Cloud Platform",
      skills: "Compute Engine, GKE, Cloud Storage, VPC, IAM, Pub/Sub, Cloud Functions, Cloud SQL, BigQuery, Cloud Load Balancing, Filestore, Cloud DNS, Secret Manager, Cloud Monitoring, Cloud Logging, KMS"
    },
    {
      title: "DevOps & CI/CD Tools", 
      skills: "Jenkins, Cloud Build, Git, GitHub, GitLab, Maven, SonarQube, Ansible, Shell Scripting, Python"
    },
    {
      title: "Infrastructure & Monitoring",
      skills: "Terraform, Deployment Manager, Docker, Kubernetes (GKE), Cloud Monitoring (Stackdriver), Prometheus, Grafana, Cloud Logging"
    }
  ];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="page"
    >
      <div className="skills">
        <h2>Skills & Expertise</h2>
        <div className="skills-grid">
          {skillCards.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <h3>{skill.title}</h3>
              <p>{skill.skills}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}