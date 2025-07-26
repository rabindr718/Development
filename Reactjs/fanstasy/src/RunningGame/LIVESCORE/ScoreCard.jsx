import React from "react";
import styles from "./ScoreCard.module.css";

const ScoreCard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>GT vs RR, 23rd Match at Ahmedabad, IPL, Apr 09 2025 - Live Cricket Score</h3>
                <div className={styles.status}>LIVE</div>
                <p>23rd Match (N), Ahmedabad, April 09, 2025, <a href="#">Indian Premier League</a></p>
            </div>

            <div className={styles.teams}>
                <div className={styles.team}><strong>Gujarat Titans</strong></div>
                <div className={styles.team}>Rajasthan Royals</div>
                <p>RR chose to field.</p>
                <p className={styles.score}>59/1 (6.4/20 ov)</p>
            </div>

            <div className={styles.runRate}>Current RR: 8.85 • Last 5 ov (RR): 47/1 (9.40)</div>

            <div className={styles.tabs}>
                <span className={styles.activeTab}>Live</span>
                <span>Scorecard</span>
                <span>Live Blog</span>
                <span>Commentary</span>
                <span>Live Stats</span>
                <span>Players</span>
                <span>Playing XI</span>
                <span>Table</span>
                <span>Videos</span>
                <span>Photos</span>
                <span>News</span>
                <span>Fantasy</span>
            </div>

            <table className={styles.scoreTable}>
                <thead>
                    <tr>
                        <th>Batters</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th>
                        <th colSpan="5">This Bowler</th><th colSpan="4">T20 Career</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Jos Buttler*</strong> (rhb)</td><td>12</td><td>13</td><td>1</td><td>0</td><td>92.30</td>
                        <td colSpan="5">2 (5b)</td><td>439</td><td>12291</td><td>124</td><td>35.12</td>
                    </tr>
                    <tr>
                        <td><strong>Sai Sudharsan</strong> (lhb)</td><td>41</td><td>24</td><td>4</td><td>2</td><td>170.83</td>
                        <td colSpan="5">17 (10b)</td><td>50</td><td>1744</td><td>103</td><td>41.52</td>
                    </tr>
                </tbody>
            </table>

            <table className={styles.bowlerTable}>
                <thead>
                    <tr>
                        <th>Bowlers</th><th>O</th><th>M</th><th>R</th><th>W</th><th>Econ</th><th>0s</th><th>4s</th><th>6s</th><th>This Spell</th><th>Mat</th><th>Wkts</th><th>BBI</th><th>Avg</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Fazalhaq Farooqi (lfm)</td><td>2.4</td><td>0</td><td>20</td><td>0</td><td>7.50</td><td>6</td><td>1</td><td>1</td><td>0.4 - 0 - 3 - 0</td><td>117</td><td>154</td><td>5/9</td><td>19.15</td>
                    </tr>
                    <tr>
                        <td>Sandeep Sharma (rm)</td><td>1</td><td>0</td><td>7</td><td>0</td><td>7.00</td><td>1</td><td>0</td><td>0</td><td>1 - 0 - 7 - 0</td><td>200</td><td>218</td><td>5/18</td><td>25.47</td>
                    </tr>
                </tbody>
            </table>

            <div className={styles.summary}>
                <p><strong>Partnership:</strong> 45 Runs, 27 B (RR: 10) • <strong>Last Bat:</strong> Shubman Gill 2 (3b) • <strong>FOW:</strong> 14/1 (2.1 Ov)</p>
                <p><strong>Reviews Remaining:</strong> Gujarat Titans - 2 of 2, Rajasthan Royals - 2 of 2</p>
            </div>
        </div>
    );
};

export default ScoreCard;
