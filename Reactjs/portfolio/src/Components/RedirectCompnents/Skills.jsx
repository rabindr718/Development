import React from "react";
import classes from "./Styles/skills.module.css";

const SkillsTable = () => {
  const items = [
    { name: "Core Java", value: 1 },
    { name: "React, Redux ", value: 2 },
    { name: "SpringBoot, Spring", value: 3 },
    { name: "Javascript", value: 4 },
    { name: "DBMS SQL", value: 5 },
    { name: "DSA + Algorithms", value: 6 },
    { name: "Python, .NET ", value: 7 },
    { name: "Wordpress, Firebase, Jira, Git, Postman", value: 8 },
    { name: "Linux, MacOS, Windows", value: 9 },
  ];

  const getGradientColor = (value) => {
    const segments = 9;
    const gradientStops = Array.from({ length: segments + 1 }, (_, i) => {
      const factor = i / segments;
      const r = Math.round(144 - 144 * factor);
      const g = Math.round(238 - 138 * factor);
      const b = Math.round(144 - 44 * factor);
      return `rgb(${r}, ${g}, ${b}) ${(i / segments) * 100}%`;
    });
    return `linear-gradient(to right, ${gradientStops.join(", ")})`;
  };

  return (
    <div className={classes.containerSkills}>
      <table className={classes.table}>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className={classes.row}>
              <td className={classes.itemName}>{item.name}</td>
              <td className={classes.itemValue}>
                <div className={classes.barContainer}>
                  <div
                    className={classes.bar}
                    style={{
                      width: "100%",
                      background: getGradientColor(item.value),
                    }}
                  >
                    <div
                      style={{
                        width: `${(item.value / 9) * 100}%`,
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  </div>
                </div>
                <div className={classes.valueText}>
                  {`${item.value} out of 9`}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillsTable;
