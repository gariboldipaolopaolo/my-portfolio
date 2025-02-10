"use client";
import {useEffect, useState} from "react";
import {gsap} from "gsap";
import {THEME} from "../utils/constants";

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || THEME.LIGHT;
        }
        return THEME.LIGHT;
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        gsap.to("body", {
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--background"),
            color: getComputedStyle(document.documentElement).getPropertyValue("--foreground"),
            duration: 0.5,
            ease: "power2.out",
        });
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
    };

    return {theme, toggleTheme};
}
