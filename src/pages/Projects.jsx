import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "GCP Infrastructure Automation @ EY LLP (HSBC)",
      period: "June 2024 – Present",
      description: "Provisioned and managed GCP infrastructure using Terraform with reusable modules. Worked on Compute Engine, Cloud Storage, IAM, VPC, Cloud DNS, Load Balancer, Cloud Armor, and Cloud Billing. Implemented IAM policies, service accounts, roles, and identity access management for enterprise-grade security.",
      tags: ["GCP", "Terraform", "IAM", "VPC", "Cloud Armor"]
    },
    {
      title: "DevOps & SRE @ HCL Tech",
      period: "June 2021 – June 2023",
      description: "Configured end-to-end CI/CD pipelines using Git, Maven, Jenkins with webhook integration and master-agent nodes for distributed builds. Created custom Docker images and orchestrated workloads with Kubernetes/GKE. Used Ansible for configuration management and server provisioning. Built reusable Terraform modules for multi-environment GCP infrastructure. Supported monitoring with Cloud Monitoring, Grafana, and Prometheus.",
      tags: ["Jenkins", "Git", "Maven", "Ansible", "Docker", "Kubernetes", "GKE", "Terraform", "Grafana"]
    },
    {
      title: "Cloud Infrastructure & SRE @ Smartried Technologies",
      period: "June 2017 – May 2021",
      description: "Managed GCP Compute Engine VMs and Linux-based environments. Implemented CI/CD using Jenkins and integrated SonarQube for code quality analysis. Managed Ansible playbooks for automation and CD. Supported Kubernetes/GKE deployments, worked with Shell scripting and Python for automation, and handled incident management and production support.",
      tags: ["GCP", "Jenkins", "SonarQube", "Ansible", "Docker", "Linux", "Kubernetes"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="page"
    >
      <div className="projects">
        <h2>Work Experience</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <h3>{project.title}</h3>
              <span style={{ color: "#FFD700", fontSize: "0.85rem", fontWeight: "500" }}>{project.period}</span>
              <p style={{ marginTop: "0.8rem" }}>{project.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}>
                {project.tags.map((tag, i) => (
                  <span key={i} style={{
                    background: "rgba(255,215,0,0.15)",
                    color: "#FFD700",
                    padding: "0.2rem 0.7rem",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    border: "1px solid rgba(255,215,0,0.3)"
                  }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
