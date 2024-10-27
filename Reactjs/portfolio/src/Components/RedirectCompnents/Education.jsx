import React from 'react';
import logo from "./images/LogoGTU.png"
import mulogo from "./images/Marwadi_University_logo.png"
import CbseLogo from "./images/CBSE_LOGO.png"
import styles from '../RedirectCompnents/Styles/education.module.css';

const Education = () => {
    const educationData = [
        {
            university: "GUJARAT TECHNOLOGICAL UNIVERSITY",
            degree: "Bachelor's of Computer Engineering",
            duration: "September 2019 - September 2023",
            status: "Completed",
            description: [
                "I am currently pursuing a Master of Computer Application (MCA) degree at Patliputra University, with an expected completion date in April 2024. This program has provided me with a deep understanding of various computer science concepts and practical skills.",
                "During my studies, I have had the opportunity to explore a wide range of topics, including software development, data structures, algorithms, and more. Additionally, I have actively participated in coding projects and collaborated with fellow students to solve complex problems.",
                "My academic journey has equipped me with the knowledge and skills necessary to excel in the field of computer science. I look forward to applying my expertise to real-world challenges and contributing to innovative solutions in the future."
            ],
            logo: logo
        },
        // {
        //     university: "Marwadi Education Foundation Group of Institutions",
        //     degree: "Bachelor's of Computer Engineering",
        //     duration: "September 2019 - January 2023",
        //     status: "Completed",
        //     description: [
        //         "I am currently pursuing a Master of Computer Application (MCA) degree at Patliputra University, with an expected completion date in April 2024. This program has provided me with a deep understanding of various computer science concepts and practical skills.",
        //         "During my studies, I have had the opportunity to explore a wide range of topics, including software development, data structures, algorithms, and more. Additionally, I have actively participated in coding projects and collaborated with fellow students to solve complex problems.",
        //         "My academic journey has equipped me with the knowledge and skills necessary to excel in the field of computer science. I look forward to applying my expertise to real-world challenges and contributing to innovative solutions in the future."
        //     ],
        //     logo: mulogo
        // }
        // {
        //     university: "NORTH STAR HIGH SCHOOL, SIWAN",
        //     degree: "STD. I to XII, Matric , Intermediate ",
        //     duration: "March 2009 - May 2019",
        //     status: "Completed",
        //     description: [
        //         "I am currently pursuing a Master of Computer Application (MCA) degree at Patliputra University, with an expected completion date in April 2024. This program has provided me with a deep understanding of various computer science concepts and practical skills.",
        //         "During my studies, I have had the opportunity to explore a wide range of topics, including software development, data structures, algorithms, and more. Additionally, I have actively participated in coding projects and collaborated with fellow students to solve complex problems.",
        //         "My academic journey has equipped me with the knowledge and skills necessary to excel in the field of computer science. I look forward to applying my expertise to real-world challenges and contributing to innovative solutions in the future."
        //     ],
        //     logo: CbseLogo
        // },

    ];

    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Education</h1>

            <div className={styles.timeline}>
                {educationData.map((edu, index) => (
                    <div key={index} className={styles.timelineItem}>
                        <div className={styles.logoContainer}>
                            <img
                                src={edu.logo}
                                alt={`${edu.university} logo`}
                                className={styles.logo}
                            />
                        </div>

                        <div className={styles.content}>
                            <h2 className={styles.university}>{edu.university}</h2>
                            <h3 className={styles.degree}>{edu.degree}</h3>

                            <div className={styles.metadata}>
                                <span>{edu.duration}</span>
                                {edu.status && (
                                    <>
                                        <span className={styles.dot}></span>
                                        <span className={styles.status}>{edu.status}</span>
                                    </>
                                )}
                            </div>

                            {edu.description && (
                                <div className={styles.description}>
                                    {edu.description.map((desc, i) => (
                                        <p key={i}>{desc}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;