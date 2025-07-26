import React from 'react';
import MatchCard from '../../RunningGame/MatchCard';
import styles from '../Home.module.css';
import { ICONS } from '../../resources/icons/icons';

const MatchCardList = () => (
    <div className={styles.cardsContainer}>
        {matches.map((match, index) => (
            <MatchCard key={index} match={match} />
        ))}
    </div>
);

export default MatchCardList;
const matches = [
    {
        matchTitle: "18th Match",
        series: "Indian Premier League 2025",
        type: "T20",
        team1: { name: "RR", logo: ICONS.RR, score: "205-4 (20)" },
        team2: { name: "PBKS", logo: ICONS.PK, score: "155-9 (20)" },
        result: "Rajasthan Royals won by 50 runs",
    },
    {
        matchTitle: "17th Match",
        series: "Indian Premier League 2025",
        type: "T20",
        team1: { name: "DC", logo: ICONS.DC, score: "183-6 (20)" },
        team2: { name: "CSK", logo: ICONS.CSK, score: "158-5 (20)" },
        result: "Delhi Capitals won by 25 runs",
    },
    {
        matchTitle: "19th Match",
        series: "Indian Premier League 2025",
        type: "T20",
        team1: { name: "SRH", logo: ICONS.SRH, score: "Today • 7:30 PM" },
        team2: { name: "GT", logo: ICONS.GT, score: "" },
        result: "",
    },
    {
        matchTitle: "3rd ODI",
        series: "Pakistan tour of New Zealand",
        type: "ODI",
        team1: { name: "NZ", logo: "/logos/nz.png", score: "264-8 (42)" },
        team2: { name: "PAK", logo: "/logos/pak.png", score: "221 (40)" },
        result: "New Zealand won by 43 runs",
    },
    {
        matchTitle: "1st Test",
        series: "India tour of England",
        type: "TEST",
        team1: { name: "IND", logo: "/logos/ind.png", score: "325-7 (90)" },
        team2: { name: "ENG", logo: "/logos/eng.png", score: "318 (85)" },
        result: "India lead by 7 runs",
    },
    {
        matchTitle: "20th Match",
        series: "Indian Premier League 2025",
        type: "T20",
        team1: { name: "MI", logo: ICONS.MI, score: "191-5 (20)" },
        team2: { name: "LSG", logo: ICONS.LSG, score: "203-8 (20)" },
        result: "Lucknow Super Giants won by 12 runs",
    }
];