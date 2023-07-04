import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import Signup from "../components/signup/Signup";
import Login from "../components/login/Login";
import Boards from "../components/boards/Boards";
import Board from "../components/board/Board"

export const AppRouter = () => {

    return (
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/boards' element={<Boards/>}/>
                <Route path='/board/:id' element={<Board/>}/>
            </Routes>
    );
};


