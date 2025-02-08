import {FunctionComponent} from "react";
import styles from "./Menu.module.css";
import {MenuItem} from "@/utils/types";

interface MenuProps {
    menuItems: MenuItem[];
}

const Menu: FunctionComponent<MenuProps> = ({menuItems}) => {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({behavior: "smooth", block: "start"});
        }
    };

    return (
        <div className={styles.menuContainer}>
            {menuItems && menuItems.map(({href, title}, idx) => {
                return <div key={idx} onClick={() => scrollToSection(href)}>{title}</div>
            })}
        </div>
    )
}

export default Menu;