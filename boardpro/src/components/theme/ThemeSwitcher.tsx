import { useState } from 'react';
import { Button, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface ThemeSwitcherProps {
    children: ReactNode;
}


const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#C0B5B5',
        },
        secondary: {
            main: '#E1E1E5',
        },
        info: {
            main: '#B5C0B5',
        },
        background: {
            default: '#FAF9FA',
        },
        text: {
            primary: '#020303',
        },
    },
    typography: {
        fontFamily: 'Roboto Condensed, Arial, sans-serif',
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#515B94',
        },
        secondary: {
            main: '#3D3226',
        },
        info: {
            main: '#FFD700',
        },
        background: {
            default: '#020303',
        },
        text: {
            primary: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: 'Roboto Condensed, Arial, sans-serif',
    },
});

const ThemeSwitcher = ({ children }: ThemeSwitcherProps) => {
    const [theme, setTheme] = useState(lightTheme);

    const handleThemeToggle = () => {
        setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
    };

    return (
        <ThemeProvider theme={theme}>
            {/*<Button onClick={handleThemeToggle}>Toggle Theme</Button>*/}
            {children}
        </ThemeProvider>
    );
};

export default ThemeSwitcher;