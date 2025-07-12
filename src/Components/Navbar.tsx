import * as React from "react";
import {useContext, useState} from "react";
import ThemeContext from "../Context/ThemeContext.tsx";
import {Moon, Sun, X, Menu} from 'lucide-react'
import {navItems, type navItemType, type SectionKey} from "../Data.ts";

interface NavbarProps {
    activeSection: string;
    onSectionChange: (section: SectionKey) => void;
}

const Navbar: React.FC<NavbarProps> = ({activeSection, onSectionChange}) => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b dark:bg-gray-900/80 border-gray-200  dark:border-gray-700">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    <button
                        onClick={() => onSectionChange('home')}
                        className="font-bold text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        KyawPaingOo
                    </button>

                    {/*Desktop Navigation*/}
                    <div className='hidden md:flex items-center space-x-3'>
                        {navItems.map((item: navItemType)=> (
                            <button
                                key={item.id}
                                onClick={()=> onSectionChange(item.id)}
                                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                                ${activeSection === item.id ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}
                                `}
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-100 dark:hover:bg-gray-800 transition-colors'
                        >
                            {theme === 'light' ? <Moon className='w-5 h-5' /> : <Sun className='w-5 h-5' /> }
                        </button>
                    </div>

                    {/*Mobile Navigation*/}
                    <div className='md:hidden flex items-center space-x-2'>
                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-100 dark:hover:bg-gray-800 transition-colors'
                        >
                            {theme === 'light' ? <Moon className='w-5 h-5' /> : <Sun className='w-5 h-5' /> }
                        </button>
                        <button
                            onClick={()=>setIsMenuOpen(!isMenuOpen)}
                            className='p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-100 dark:hover:bg-gray-800 transition-colors'
                        >
                            {isMenuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
                        </button>
                    </div>
                </div>

                {/*Mobile Menu*/}
                {isMenuOpen && (
                    <div className='md:hidden py-4 space-y-2'>
                        {navItems.map((item)=> (
                            <button
                                key={item.id}
                                onClick={()=> {
                                    onSectionChange(item.id);
                                    setIsMenuOpen(!isMenuOpen);
                                }}
                                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors
                                    ${activeSection === item.id ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}
                                `}
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

        </nav>
    )
}

export default Navbar;