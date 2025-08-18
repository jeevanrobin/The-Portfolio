import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="page"
    >
      <div className="about">
        <h2>About Me</h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Currently serving as a Senior Risk Consultant at EY (Ernst & Young) since June 2024, 
          with 7+ years of IT experience and 5.5+ years specializing in DevOps engineering. 
          Expert in automation, configuration management, CI/CD, and cloud-native application 
          delivery on Google Cloud Platform (GCP). Strong hands-on expertise in designing, 
          deploying, and managing scalable solutions including GKE, Cloud Build, Terraform, 
          and comprehensive monitoring with Stackdriver and Grafana.
        </motion.p>
      </div>
    </motion.div>
  );
}