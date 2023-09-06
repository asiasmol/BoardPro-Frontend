import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import {withAxiosIntercepted} from "./hooks/withAxiosIntercepted";
import { ToastContainer } from "react-toastify";
import {AppRouter} from "./router/AppRouter";
import {UserContextProvider} from "./context/UserContext";
import {BoardContextProvider} from "./context/BoardContext";
import {CssBaseline} from "@mui/material";
import {ThemeContextProvider} from "./context/ThemeContext";

function App() {

    return (

            <ThemeContextProvider>
                <UserContextProvider>
                    <BoardContextProvider>
                        <CssBaseline />
                        <Navbar/>
                            <AppRouter />
                            <ToastContainer />
                    </BoardContextProvider>
                </UserContextProvider>
            </ThemeContextProvider>

    );
}

export default withAxiosIntercepted(App);
