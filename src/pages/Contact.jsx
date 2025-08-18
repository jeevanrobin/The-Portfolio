import { motion } from "framer-motion";

export default function Contact() {
  const contactItems = [
    { 
      label: "Email", 
      value: "medidajeevanreddy499@gmail.com", 
      icon: "fas fa-envelope",
      link: "mailto:medidajeevanreddy499@gmail.com?subject=Portfolio Contact&body=Hi Jeevan, I found your portfolio and would like to connect."
    },
    { 
      label: "Phone", 
      value: "+91 8309823797", 
      icon: "fas fa-phone",
      link: "tel:+918309823797"
    },
    { 
      label: "Location", 
      value: "Hyderabad, India", 
      icon: "fas fa-map-marker-alt",
      link: "https://www.google.com/maps/search/Hyderabad,+India"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="page"
    >
      <div className="contact">
        <h2>Let's Connect</h2>
        <div className="contact-info">
          {contactItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target={item.label === "Location" ? "_blank" : "_self"}
              rel={item.label === "Location" ? "noopener noreferrer" : ""}
              className="contact-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <i className={item.icon}></i>
              <strong>{item.label}</strong><br />
              {item.value}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}