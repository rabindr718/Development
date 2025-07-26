import React from "react";
import styles from "./Footer.module.css";
import ImageUploader from "../Admin/ImageUploader"
function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.grid}>
                <div className={styles.column}>
                    <a href="#">Rohit Sharma</a>
                    <a href="#">Virat Kohli</a>
                    <a href="#">KL Rahul</a>
                    <a href="#">Rishabh Pant</a>
                    <a href="#">Jasprit Bumrah</a>
                </div>
                <div className={styles.column}>
                    <a href="#">MS Dhoni</a>
                    <a href="#">Hardik Pandya</a>
                    <a href="#">Shubman Gill</a>
                    <a href="#">Shikhar Dhawan</a>
                    <a href="#">Suryakumar Yadav</a>
                </div>
                <div className={styles.column}>
                    <a href="#">Steve Smith</a>
                    <a href="#">Pat Cummins</a>
                    <a href="#">David Warner</a>
                    <a href="#">Glenn Maxwell</a>
                    <a href="#">Marnus Labuschagne</a>
                </div>
                <div className={styles.column}>
                    <a href="#">Joe Root</a>
                    <a href="#">Ben Stokes</a>
                    <a href="#">Jos Buttler</a>
                    <a href="#">Jofra Archer</a>
                    <a href="#">Moeen Ali</a>
                </div>
                <div className={styles.column}>
                    <a href="#">Babar Azam</a>
                    <a href="#">Shaheen Afridi</a>
                    <a href="#">Mohammad Rizwan</a>
                    <a href="#">Shadab Khan</a>
                    <a href="#">Imam-ul-Haq</a>
                </div>
            </div>
            <ImageUploader />
            <div className={styles.copy}>
                All rights reserved © 2022 CricketNetwork.com
            </div>
        </div>
    );
}

export default Footer;
