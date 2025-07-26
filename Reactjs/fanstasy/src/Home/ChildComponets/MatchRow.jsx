import React from 'react';
import styles from '../Home.module.css';

const MatchRow = () => {
    const matchResults = [
        "RR vs PBKS - RR won", "DC vs CSK - DC won", "NZ vs PAK - NZ won", "LSG vs MI - LSG won"
    ];
    const repeated = Array(6).fill(matchResults).flat();

    return (
        <div className={styles.matchRow}>
            {repeated.map((text, i) => (
                <div key={i} className={styles.matchCard}>{text}</div>
            ))}
        </div>
    );
};

export default MatchRow;
