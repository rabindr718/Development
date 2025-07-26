import React from "react";
import styles from "./MatchCard.module.css";

const MatchCard = ({ match }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.matchInfo}>{match.matchTitle} • {match.series}</span>
                <span className={`${styles.badge} ${styles[match.type.toLowerCase()]}`}>{match.type}</span>
            </div>
            <div className={styles.teamsContainer}>
                <div className={styles.teamRow}>
                    <div className={styles.teamLogo}>
                        <img src={match.team1.logo} alt={match.team1.name} />
                    </div>
                    <div className={styles.teamName}>{match.team1.name}</div>
                    <div className={styles.teamScore}>{match.team1.score}</div>
                </div>
                <div className={styles.teamRow}>
                    <div className={styles.teamLogo}>
                        <img src={match.team2.logo} alt={match.team2.name} />
                    </div>
                    <div className={styles.teamName}>{match.team2.name}</div>
                    <div className={styles.teamScore}>{match.team2.score}</div>
                </div>
            </div>
            <div className={styles.result}>{match.result}</div>
            <div className={styles.footer}>
                <a href="#" className={styles.footerLink}>FANTASY</a>
                <a href="#" className={styles.footerLink}>TABLE</a>
                <a href="#" className={styles.footerLink}>SCHEDULE</a>
                {match.type === "ODI" && <a href="#" className={styles.footerLink}>HANDBOOK</a>}
            </div>
        </div>
    );
};

export default MatchCard;
