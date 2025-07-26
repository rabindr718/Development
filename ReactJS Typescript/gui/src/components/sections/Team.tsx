import React from "react";
import styles from "./Team.module.css";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  skills: string[];
  social: {
    linkedin?: string;
    github?: string;
  };
}

const TEAM_DATA: TeamMember[] = [
  {
    id: "1",
    name: "Alexander Schmidt",
    position: "CEO & Lead Architect",
    bio: "15+ years of experience in enterprise software development and team leadership.",
    skills: [
      "Strategic Planning",
      "System Architecture",
      "Team Leadership",
      "Business Development",
    ],
    social: { linkedin: "#", github: "#" },
  },
  {
    id: "2",
    name: "Maria Rodriguez",
    position: "CTO & Full Stack Developer",
    bio: "Expert in modern web technologies with a passion for scalable solutions.",
    skills: ["React", "Node.js", "AWS", "DevOps"],
    social: { linkedin: "#", github: "#" },
  },
  {
    id: "3",
    name: "Jean Dubois",
    position: "Senior Mobile Developer",
    bio: "Specialist in native iOS and Android development with React Native expertise.",
    skills: ["iOS", "Android", "React Native", "Flutter"],
    social: { linkedin: "#", github: "#" },
  },
  {
    id: "4",
    name: "Anna Kowalski",
    position: "UI/UX Designer",
    bio: "Creative designer focused on user-centered design and modern aesthetics.",
    skills: ["UI Design", "UX Research", "Figma", "Design Systems"],
    social: { linkedin: "#" },
  },
  {
    id: "5",
    name: "Lars Hansen",
    position: "DevOps Engineer",
    bio: "Infrastructure specialist ensuring reliable and scalable deployments.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    social: { linkedin: "#", github: "#" },
  },
  {
    id: "6",
    name: "Sofia Petrov",
    position: "Data Scientist",
    bio: "AI/ML expert developing intelligent solutions for complex business problems.",
    skills: ["Python", "TensorFlow", "Data Analysis", "Machine Learning"],
    social: { linkedin: "#", github: "#" },
  },
];

const Team: React.FC = () => {
  return (
    <section className={styles.team}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Meet Our Team</h2>
          <p>
            Talented professionals from across Europe working together to
            deliver excellence
          </p>
        </div>

        <div className={styles.teamGrid}>
          {TEAM_DATA.map((member) => (
            <div key={member.id} className={styles.teamCard}>
              <div className={styles.memberImage}>
                <div className={styles.imagePlaceholder}>
                  <span>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>
              <div className={styles.memberContent}>
                <h3>{member.name}</h3>
                <span className={styles.position}>{member.position}</span>
                <p>{member.bio}</p>
                <div className={styles.skills}>
                  {member.skills.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
                <div className={styles.socialLinks}>
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className={styles.socialLink}
                    >
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className={styles.socialLink}
                    >
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
