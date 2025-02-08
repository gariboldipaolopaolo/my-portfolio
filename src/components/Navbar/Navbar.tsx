"use client"
import {FunctionComponent} from "react";
import styles from "./Navbar.module.css";
import {MENU_ITEMS} from "@/utils/constants";
import Menu from "@/components/Menu/Menu";
import useIsMobile from "@/hooks/useIsMobile";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import EmailButton from "@/components/Navbar/EmailButton/EmailButton";
import SwitchModeButton from "@/components/Navbar/SwitchModeButton/SwitchModeButton";

const Navbar: FunctionComponent = () => {
    const isMobile = useIsMobile()

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
                    <EmailButton/>
                    <SwitchModeButton/>
                </>
            )
            }
            {!isMobile
                ? <Menu menuItems={MENU_ITEMS}/>
                : <MobileMenu menuItems={MENU_ITEMS}/>}
        </div>
    )
}

export default Navbar