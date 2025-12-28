import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeContext from "./Context/ThemeContext.tsx";
import useTheme from './Hook/useTheme.tsx';
import MainLandingPage from './Pages/MainLandingPage.tsx';
import ProjectDetails from './Pages/ProjectDetails.tsx';

const App: React.FC = () => {
    
    const themeValue = useTheme();

    return (
        <ThemeContext.Provider value={themeValue}>
            <Router>
                <Routes>
                    <Route path="/*" element={<MainLandingPage />} />
                    <Route path="/project/:id" element={<ProjectDetails />} />
                </Routes>
            </Router>
        </ThemeContext.Provider>
    )
}

export default App