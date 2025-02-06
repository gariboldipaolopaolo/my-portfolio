import {useEffect, useState} from "react";
import {gsap} from "gsap";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        return (localStorage.getItem("theme") as "light" | "dark") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        // GSAP Animation
        gsap.to("body", {
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--background"),
            color: getComputedStyle(document.documentElement).getPropertyValue("--foreground"),
            duration: 0.5,
            ease: "power2.out",
        });
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return {theme, toggleTheme};
}
