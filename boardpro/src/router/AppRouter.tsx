import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import BoardsScreen from "../screens/BoardsScreen";

export const AppRouter = () => {

    return (
            <Routes>
                <Route path='/' element={<HomeScreen/>}/>
                <Route path='/signup' element={<SignupScreen/>}/>
                <Route path='/login' element={<LoginScreen/>}/>
                <Route path='/board' element={<BoardsScreen/>}/>
            </Routes>
    );
};


