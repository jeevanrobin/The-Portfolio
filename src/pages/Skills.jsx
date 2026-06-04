import { motion } from "framer-motion";

export default function Skills() {
  const skillCards = [
    {
      title: "☁️ Cloud Platform (GCP)",
      skills: "Compute Engine, Cloud Storage, IAM, VPC Network, Cloud DNS, Load Balancer, Cloud Monitoring, Cloud Logging, Cloud Armor, Cloud Billing"
    },
    {
      title: "🛠️ DevOps Tools",
      skills: "Git, Jenkins, Ansible, Docker, Maven, SonarQube"
    },
    {
      title: "🏗️ Infrastructure & IaC",
      skills: "Terraform, Infrastructure as Code (IaC), Reusable Terraform Modules, GCP Infrastructure Provisioning"
    },
    {
      title: "🐳 Containerization & Orchestration",
      skills: "Docker, Kubernetes, GKE (Google Kubernetes Engine), Custom Dockerfiles, Container Management"
    },
    {
      title: "⚙️ CI/CD & Automation",
      skills: "Jenkins Pipelines, Git Webhooks, Deployment Automation, Release Management, Build Automation, Maven (WAR/JAR)"
    },
    {
      title: "📊 Monitoring & Observability",
      skills: "Cloud Monitoring, Cloud Logging, Grafana, Prometheus, Alerting, Incident Management"
    },
    {
      title: "🔐 Cloud Security & Governance",
      skills: "IAM Roles & Policies, Service Accounts, Cloud Armor, SSL Certificate Management, API Key Management"
    },
    {
      title: "🖥️ Scripting & OS",
      skills: "Shell Scripting, Python, Linux Server Administration, Windows"
    },
    {
      title: "🚨 Production Support / SRE",
      skills: "Incident Management, Root Cause Analysis, Troubleshooting, System Reliability, High Availability, SLA Management"
    },
    {
      title: "📁 Source Control",
      skills: "Git, GitHub, GitLab, Branching Strategies, Code Merging, Release Workflows"
    }
  ];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
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
              transition={{ delay: index * 0.05, duration: 0.3 }}
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
