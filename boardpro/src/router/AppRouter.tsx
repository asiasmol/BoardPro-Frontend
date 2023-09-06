import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";
import Boards from "../components/boards/Boards";
import Board from "../components/board/Board"
import {ProtectedRoute} from "./ProtectedRoute";

export const AppRouter = () => {

    return (
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/boards' element={
                    <ProtectedRoute>
                        <Boards/>
                    </ProtectedRoute>
                }/>
                <Route path='/board/:id' element={
                    <ProtectedRoute>
                        <Board/>
                    </ProtectedRoute>
                }/>
            </Routes>
    );
};


