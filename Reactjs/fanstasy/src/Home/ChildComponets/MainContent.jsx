import React from 'react';
import styles from '../Home.module.css';

const MainContent = () => (
    <div className={styles.main}>
        {/* Left News Panel */}
        <div className={styles.leftPanel}>
            <h2>LATEST NEWS</h2>
            {[...Array(5)].map((_, i) => (
                <ul key={i} className={styles.latestNews}>
                    <li className={styles.latestNewsHeading}>Bumrah joins MI squad ahead of RCB</li>
                    <li className={styles.latestNewsText}>Can BCB get communication right?</li>
                    <li className={styles.latestNewsTime}>2 hours</li>
                    <li className={styles.linebelow}></li>
                </ul>
            ))}
        </div>

        {/* Center News Panel */}
        <div className={styles.centerPanel}>
            {[1, 2, 3].map((_, i) => (
                <div key={i} className={styles.cretaeLineBelow}>
                    <h3 className={styles.iplXtraMainHead}>IPL 2025</h3>
                    <img
                        src="https://static.cricbuzz.com/a/img/v1/1080x608/i1/c647855/having-aced-multiple-roles-in-the-batting-order-for-rcb-in-2016-rahul-might-have-to-repeat-those-heroics-once-again-in-2025-for-his-new-franchise.jpg"
                        alt="News"
                        className={styles.mainImage}
                    />
                    <p className={styles.featureText}>Bumrah joins MI squad ahead of home fixture against RCB</p>
                    <p className={styles.explainSection}>The pacer had been sidelined with injury since the Sydney Test earlier this year</p>
                </div>
            ))}
        </div>

        {/* Right Video Panel */}
        <div className={styles.rightPanel}>
            <h2>UPCOMING GAMES</h2>
            <div className={styles.videoCard}><p>The Dhoni Debate</p></div>
            <div className={styles.videoCard}><p>Harsha Bhogle on Archer</p></div>
        </div>
    </div>
);

export default MainContent;
