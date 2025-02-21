import React, { createContext, useState, useContext } from 'react';

// Créez le contexte du thème
const ThemeContext = createContext();

// Créez un fournisseur de thème
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // Par défaut, le thème est 'light'

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte du thème
export const useTheme = () => useContext(ThemeContext); 