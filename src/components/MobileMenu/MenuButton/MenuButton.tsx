import {FunctionComponent, useEffect, useRef} from "react";
import gsap from "gsap";
import styles from "./MenuButton.module.css";

interface MenuButtonProps {
    isMobileMenuOpen: boolean;
    handleToggleMobileMenu: () => void;
}

const MenuButton: FunctionComponent<MenuButtonProps> = ({isMobileMenuOpen, handleToggleMobileMenu}) => {
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (textRef.current) {
            gsap.fromTo(
                textRef.current,
                {opacity: 0, y: -20, rotateX: 90},
                {opacity: 1, y: 0, rotateX: 0, duration: 0.5, ease: "power2.out"}
            );
        }
    }, [isMobileMenuOpen]);

    return (
        <div
            className={styles.button}
            onClick={handleToggleMobileMenu}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleToggleMobileMenu();
            }}
        >
            <span ref={textRef}>{isMobileMenuOpen ? "CLOSE" : "MENU"}</span>
        </div>
    );
};

export default MenuButton;
