import {FunctionComponent} from "react";
import styles from "./Menu.module.css";

interface MenuItem {
    href: string;
    title: string;
}

interface MenuProps {
    isMobile: boolean;
}

const menuItems: MenuItem[] = [
    {href: "about", title: "ABOUT"},
    {href: "experiences", title: "EXPERIENCES"},
    {href: "technologies", title: "TECHNOLOGIES"},
    {href: "contacts", title: "CONTACTS"},
]


const Menu: FunctionComponent<MenuProps> = ({isMobile}) => {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({behavior: "smooth", block: "start"});
        }
    };

    return (
        <div className={styles.menuContainer}>
            {!isMobile ? menuItems.map(({href, title}, idx) => {
                return <div key={idx} onClick={() => scrollToSection(href)}>{title}</div>
            }) : <div className={styles.menu}>MENU</div>}
        </div>
    )
}

export default Menu;