import styles from "./Styles/skills.module.css";
import React from "react";

const SkillsTable = () => {
  const items = [
    { name: "Core Java", value: 10, totalSpots: 10 },
    { name: "React, Redux", value: 7, totalSpots: 10 },
    { name: "SpringBoot, Spring", value: 8, totalSpots: 10 },
    { name: "Javascript", value: 7, totalSpots: 10 },
    { name: "DBMS SQL", value: 5, totalSpots: 10 },
    { name: "DSA + Algorithms", value: 6, totalSpots: 10 },
    { name: "Python, Basic .NET", value: 7, totalSpots: 10 },
    { name: "Wordpress, Firebase, Jira, Git, Postman", value: 8, totalSpots: 10 },
    { name: "Linux, MacOS, Windows", value: 9, totalSpots: 10 },
  ];

  return (
    <div className={styles.Skillscontainer}>
      <span className={styles.HeadingTittle}>Skills & Technologies</span>
      {items.map((item, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.nameContainer}>
            <div className={styles.heading}>{item.name}</div>
          </div>  
          <div className={styles.progressContainer}>
          <div className={styles.progressBarContainer}>
              <div 
                className={styles.progressBar}
                style={{
                  width: `${(item.value / item.totalSpots) * 100}%`,
                }}
              ></div>
            </div>
           
            <div className={styles.progressText}>
              {item.value} out of {item.totalSpots}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsTable;








































