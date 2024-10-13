import React from "react";
import styles from "./Styles/skills.module.css";

const SkillsTable = () => {
  // Array of items with their corresponding values
  const items = [
    { name: "Item 1", value: 1 },
    { name: "Item 2", value: 2 },
    { name: "Item 3", value: 3 },
    { name: "Item 4", value: 4 },
    { name: "Item 5", value: 5 },
    { name: "Item 6", value: 6 },
    { name: "Item 7", value: 7 },
    { name: "Item 8", value: 8 },
    { name: "Item 9", value: 9 },
  ];

  const getBarColor = (value) => {
    // Light blue (rgb(173, 216, 230)) to dark blue (rgb(0, 0, 139))
    const lightBlue = [173, 216, 230];
    const darkBlue = [0, 0, 139];

    // Calculate color intensity based on the value (1-9)
    const interpolateColor = (start, end, factor) =>
      start + (end - start) * factor;

    const factor = (value - 1) / 8; // Scale between 0 (for value 1) and 1 (for value 9)
    const r = Math.round(interpolateColor(lightBlue[0], darkBlue[0], factor));
    const g = Math.round(interpolateColor(lightBlue[1], darkBlue[1], factor));
    const b = Math.round(interpolateColor(lightBlue[2], darkBlue[2], factor));

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className={styles.containerSkills}>
      <table className={styles.table}>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className={styles.row}>
              <td className={styles.itemName}>{item.name}</td>
              <td className={styles.itemValue}>
                <div className={styles.barContainer}>
                  <div
                    className={styles.bar}
                    style={{
                      width: `${(item.value / 9) * 100}%`, // Calculate width based on item value
                      backgroundColor: getBarColor(item.value), // Get dynamic color
                    }}
                  ></div>
                </div>
                <div
                  className={styles.valueText}
                >{`${item.value} out of 9`}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillsTable;
