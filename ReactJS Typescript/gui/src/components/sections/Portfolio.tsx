import React, { useState } from "react";
import styles from "./Portfolio.module.css";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  year: number;
  client: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "Modern e-commerce solution with advanced analytics and multi-language support",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    year: 2024,
    client: "Fashion Retailer (DE)",
  },
  {
    id: "2",
    title: "Banking Mobile App",
    description:
      "Secure mobile banking application with biometric authentication",
    category: "Mobile Development",
    technologies: ["React Native", "Node.js", "PostgreSQL", "AWS"],
    year: 2024,
    client: "Credit Union (NL)",
  },
  {
    id: "3",
    title: "Supply Chain Management",
    description: "Enterprise solution for logistics and inventory management",
    category: "Enterprise Software",
    technologies: ["Vue.js", "Python", "PostgreSQL", "Docker"],
    year: 2023,
    client: "Logistics Company (FR)",
  },
  {
    id: "4",
    title: "AI Chatbot Platform",
    description:
      "Intelligent customer service solution with multilingual support",
    category: "AI & ML",
    technologies: ["Python", "TensorFlow", "React", "Redis"],
    year: 2023,
    client: "Telecom Provider (IT)",
  },
  {
    id: "5",
    title: "Healthcare Dashboard",
    description: "Patient management system with real-time monitoring",
    category: "Web Development",
    technologies: ["Angular", "C#", "SQL Server", "Azure"],
    year: 2023,
    client: "Medical Center (ES)",
  },
  {
    id: "6",
    title: "IoT Fleet Management",
    description: "Real-time vehicle tracking and fleet optimization system",
    category: "Cloud Solutions",
    technologies: ["React", "AWS IoT", "Lambda", "DynamoDB"],
    year: 2022,
    client: "Transport Company (BE)",
  },
];

const CATEGORIES = [
  "All",
  "Web Development",
  "Mobile Development",
  "Enterprise Software",
  "AI & ML",
  "Cloud Solutions",
];

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.category === activeCategory);

  return (
    <section className={styles.portfolio}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Our Portfolio</h2>
          <p>Successful projects delivered across the European Union</p>
        </div>

        <div className={styles.categoryFilter}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${
                activeCategory === category ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectImage}>
                <div className={styles.imagePlaceholder}>
                  <span>Project Screenshot</span>
                </div>
                <div className={styles.projectOverlay}>
                  <button className={styles.viewProject}>View Project</button>
                </div>
              </div>
              <div className={styles.projectContent}>
                <span className={styles.projectCategory}>
                  {project.category}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.projectTech}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.projectFooter}>
                  <span className={styles.projectYear}>{project.year}</span>
                  <span className={styles.projectClient}>{project.client}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
