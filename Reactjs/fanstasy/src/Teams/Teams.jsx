import React from "react";
import data from "../data.json";
import styles from "../teams/teams.module.css"

const IPL = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{data.tournament}</h1>
      <p className={styles.subtitle}>
        {data.format} • {data.duration}
      </p>
      <div className={styles.matches}>
        {data.matches.map((match) => (
          <div key={match.match_number} className={styles.matchCard}>
            <h3 className={styles.matchNumber}>Match {match.match_number}</h3>
            <p className={styles.matchDetails}>
              Date: {match.date}
              {match.time && ` • ${match.time}`}
            </p>
            <p className={styles.matchDetails}>Venue: {match.venue}</p>
            <p className={styles.teams}>
              {match.team1.name} ({match.team1.abbr})
              {match.team1.score && ` - ${match.team1.score}`} vs{" "}
              {match.team2.name} ({match.team2.abbr})
              {match.team2.score && ` - ${match.team2.score}`}
            </p>
            <p className={styles.result}>Result: {match.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IPL;
