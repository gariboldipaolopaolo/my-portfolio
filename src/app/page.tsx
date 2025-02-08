import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Landing from "@/components/Landing/Landing";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Navbar/>
                <Landing/>
            </main>
            <footer className={styles.footer}>
            </footer>
        </div>
    );
}
