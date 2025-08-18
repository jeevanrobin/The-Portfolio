import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "GCP Infrastructure Automation",
      description: "Implemented Infrastructure as Code using Terraform and Deployment Manager to automate resource provisioning on GCP. Configured end-to-end delivery pipelines using Git, Maven, Jenkins, and Cloud Build with webhook integration for continuous deployment."
    },
    {
      title: "Container Orchestration & CI/CD", 
      description: "Designed multi-stage Docker builds and orchestrated workloads at scale with Kubernetes (GKE). Implemented robust CI/CD pipelines using Jenkins and Cloud Build, with automated build, test, and deployment processes for cloud-native applications."
    },
    {
      title: "Monitoring & Security Implementation",
      description: "Established comprehensive monitoring and observability using Cloud Monitoring (Stackdriver), Prometheus, and Grafana. Implemented security best practices with GCP IAM, Secret Manager, and role-based access controls for enterprise environments."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="page"
    >
      <div className="projects">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}