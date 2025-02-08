"use client"
import {FunctionComponent} from "react";
import styles from "./SwitchModeButton.module.css"
import {THEME} from "@/utils/constants";
import {useTheme} from "@/hooks/useTheme";

const SwitchModeButton: FunctionComponent = () => {
    const {theme, toggleTheme} = useTheme()
    return (
        <div className={styles.switch} onClick={toggleTheme}>
            <p>
                Switch to <br/>
                {theme === THEME.LIGHT ? 'Dark' : 'Light'} Mode
            </p>

        </div>
    )
}

export default SwitchModeButton;