"use client"
import {FunctionComponent} from "react";
import styles from "./Navbar.module.css";
import {useTheme} from "@/hooks/useTheme";
import {THEME} from "@/utils/constants";
import Menu from "@/components/Menu/Menu";
import useIsMobile from "@/hooks/useIsMobile";

const Navbar: FunctionComponent = () => {
    const isMobile = useIsMobile()
    const {theme, toggleTheme} = useTheme()
    const handleSendEmail = () => {
        window.location.href = "mailto:gariboldipaolopaolo@gmail.com";
    };
    return (
        <div className={styles.navbarContainer}>
            <div>
                <p>
                    Based in <br/>
                    Varese, Italy
                </p>
            </div>
            {!isMobile && (
                <>
                    <div className={styles.emailLink} onClick={handleSendEmail}>
                        <p>
                            Say hello <br/>
                            gariboldipaolopaolo@gmail.com
                        </p>

                    </div>
                    <div className={styles.emailLink} onClick={toggleTheme}>
                        <p>
                            Switch to <br/>
                            {theme === THEME.LIGHT ? 'Dark' : 'Light'} Mode
                        </p>

                    </div>
                </>
            )
            }
            <Menu isMobile={isMobile}/>
        </div>
    )
}

export default Navbar