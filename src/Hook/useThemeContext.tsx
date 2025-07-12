import {useContext} from "react";
import ThemeContext from "../Context/ThemeContext.tsx";

const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within ThemeContext');
    }
    return context;
}

export default useThemeContext;