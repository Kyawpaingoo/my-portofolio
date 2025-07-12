import {type Context, createContext} from 'react'
import type {Theme} from "../Data.ts";


interface ThemeContextProps {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext: Context<ThemeContextProps>= createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => {},
})

export default ThemeContext;



