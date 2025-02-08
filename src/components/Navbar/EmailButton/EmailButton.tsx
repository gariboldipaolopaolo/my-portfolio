import {FunctionComponent} from "react";
import styles from "./EmailButton.module.css"
import {EMAIL_REF} from "@/utils/constants";

const EmailButton: FunctionComponent = () => {
    const handleSendEmail = () => {
        window.location.href = EMAIL_REF;
    };
    
    return (
        <div className={styles.emailLink} onClick={handleSendEmail}>
            <p>
                Say hello <br/>
                gariboldipaolopaolo@gmail.com
            </p>

        </div>
    )
}

export default EmailButton