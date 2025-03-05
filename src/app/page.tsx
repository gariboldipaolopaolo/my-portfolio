import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Landing from "@/components/Landing/Landing";
import Section from "@/components/Section/Section";
import {ABOUT_TITLES} from "@/utils/constants";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Navbar/>
                <Landing/>
                <Section title={ABOUT_TITLES}/>
            </main>
            <footer className={styles.footer}>
            </footer>
        </div>
    );
}
