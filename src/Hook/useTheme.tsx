import {useState, useEffect} from "react";
import type {Theme} from "../Data.ts";

const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Read from localStorage, default to light
        const saved = localStorage.getItem('theme');
        return (saved === 'dark' || saved === 'light') ? saved : 'light';
    });

    // Effect: Always sync the class with the theme
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
};

export default useTheme;