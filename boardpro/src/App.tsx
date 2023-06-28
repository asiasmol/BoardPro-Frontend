import React from 'react';
import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import {Container} from 'react-bootstrap';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
      <>
        <Header/>
          <main>
              <Container>
                  <Routes>
                  <Route path='/' element={<HomeScreen/>}/>
                  <Route path='/signup' element={<SignupScreen/>}/>
                  <Route path='/login' element={<LoginScreen/>}/>
                  </Routes>
              </Container>
          </main>

        <Footer/>
      </>
  );
}

export default App;
