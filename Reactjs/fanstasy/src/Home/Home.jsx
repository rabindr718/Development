import React from 'react';
import styles from './Home.module.css';
import TopBar from '../Home/ChildComponets/TopBar';
import MatchRow from '../Home/ChildComponets/MatchRow';
import MatchCardList from '../Home/ChildComponets/MatchCardList';
import MainContent from '../Home/ChildComponets/MainContent';

const Home = () => {
    return (
        <div className={styles.container}>
            <TopBar />
            <MatchRow />
            <MatchCardList />
            <MainContent />
        </div>
    );
};

export default Home;
