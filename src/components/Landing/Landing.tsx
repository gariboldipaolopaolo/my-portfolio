import {FunctionComponent} from "react";
import styles from "./Landing.module.css";

const Landing: FunctionComponent = () => {
    return (
        <div className={styles.landingContainer}>
            <div className={styles.titleContainer}>
                <h1>PAOLO</h1>
                <div className={styles.surnameContainer}>
                    <h1>
                        GARIBOLDI
                    </h1>
                </div>
            </div>
            <div className={styles.subtitleContainer}>
                <h2>"I'll make things work."</h2>
                <h3>A results-driven software engineer with 5+ years of experience developing scalable solutions</h3>
            </div>
        </div>
    )
}

export default Landing