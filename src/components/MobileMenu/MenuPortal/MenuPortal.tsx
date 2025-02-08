"use client"
import {FunctionComponent} from "react";
import {MenuItem} from "@/utils/types";
import styles from "./MenuPortal.module.css";
import EmailButton from "@/components/Navbar/EmailButton/EmailButton";
import SwitchModeButton from "@/components/Navbar/SwitchModeButton/SwitchModeButton";
import MenuButton from "@/components/MobileMenu/MenuButton/MenuButton";

interface MobilePortalProps {
    menuItems: MenuItem[];
    handleToggleMobileMenu: () => void;
    isMobileMenuOpen: boolean;
    contentRef: any
}

const MenuPortal: FunctionComponent<MobilePortalProps> = ({
                                                              menuItems,
                                                              isMobileMenuOpen,
                                                              handleToggleMobileMenu,
                                                              contentRef
                                                          }) => {

    return (
        <div className={styles.menuContainer}>
            <div className={styles.topBarContainer}>
                <div>
                    <p>
                        Based in <br/>
                        Varese, Italy
                    </p>
                </div>
                <MenuButton isMobileMenuOpen={isMobileMenuOpen} handleToggleMobileMenu={handleToggleMobileMenu}/>
            </div>
            <div ref={contentRef}>
                <div className={styles.menuItemsContainer}>
                    {
                        menuItems && menuItems.map(({href, title}, idx) => {
                            return <div key={idx} className={styles.menuItem}>{title}</div>
                        })
                    }
                </div>
                <div className={styles.bottomBarContainer}>
                    <EmailButton/>
                    <SwitchModeButton/>
                </div>
            </div>
        </div>
    )
}

export default MenuPortal;