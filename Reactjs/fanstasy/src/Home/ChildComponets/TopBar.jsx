import React from 'react';
import styles from '../Home.module.css';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const navigate = useNavigate();

    const handleIPLSchedule = () => {
        navigate('/ipl-schedule');
    };

    return (
        <div className={styles.topBar}>
            <h1>Cricbuzz Clone</h1>
            <div className={styles.menu}>
                <span>Live Scores</span>
                <span onClick={handleIPLSchedule}>IPL Schedule</span>
                <span>News</span>
                <span>Teams</span>
                <span>Videos</span>
                <span>Rankings</span>
            </div>
        </div>
    );
};

export default TopBar;
