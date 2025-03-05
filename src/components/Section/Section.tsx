"use client";

import {FunctionComponent, JSX, useRef} from "react";
import styles from "./Section.module.css";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {CustomEase} from "gsap/CustomEase";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase, ScrollTrigger);

interface SectionProps {
    title: string[];
    children?: JSX.Element;
}

const Section: FunctionComponent<SectionProps> = ({title, children}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useGSAP(() => {
        CustomEase.create("custom", "M0,0,C0.5,0,0,1,1,1");

        gsap.from(textRefs.current, {
            scrollTrigger: {
                trigger: containerRef.current, // Usa il contenitore per attivare tutte le righe
                start: "top 70%",
            },
            y: 400,
            skewY: 10,
            duration: 1,
            ease: "custom"
        });
    }, [title]);

    return (
        <div ref={containerRef} className={styles.section}>
            <div className={styles.titleContainer}>
                {title.map((item, index) => (
                    <div key={index} className={styles.lineWrapper}>
            <span
                ref={(el: any) => (textRefs.current[index] = el)}
                className={styles.lineText}
            >
              {item}
            </span>
                    </div>
                ))}
                <div className={styles.lineWrapper}>
                    <span></span>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Section;
