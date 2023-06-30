import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";

export const AppRouter = () => {

    return (
            <Routes>
                <Route path='/' element={<HomeScreen/>}/>
                <Route path='/signup' element={<SignupScreen/>}/>
                <Route path='/login' element={<LoginScreen/>}/>
            </Routes>
    );
};


