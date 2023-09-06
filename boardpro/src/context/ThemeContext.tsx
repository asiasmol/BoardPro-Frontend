import {createContext, useEffect, useState} from 'react';
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#dc7d2e',
        },
        secondary: {
            main: '#797878',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#e0e0e0',
            secondary: '#9e9e9e',
        },
    },
    shape: {
        borderRadius: 6,
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    spacing: 2,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#33557e',
        },
        secondary: {
            main: '#6694d3',
        },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
    },
    shape: {
        borderRadius: 6,
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    spacing: 2,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

const defaultThemeValue = {
    theme: darkTheme,
    toggleTheme: () => {},
};
export const ThemeContext = createContext(defaultThemeValue);
export const ThemeContextProvider =({ children }: React.PropsWithChildren) => {
    const [theme, setTheme] = useState(() => {
        const localTheme = window.localStorage.getItem('theme');
        return localTheme === 'dark' ? darkTheme : lightTheme;
    });

    const [isDark, setIsDark] = useState(() => theme === darkTheme);

    useEffect(() => {
        window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => {
        if (theme === lightTheme) {
            setTheme(darkTheme);
            setIsDark(true);
        } else {
            setTheme(lightTheme);
            setIsDark(false);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
