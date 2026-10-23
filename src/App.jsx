import React, {useContext} from 'react';
import { Route, Routes, Navigate} from "react-router-dom"
import Header from "./components/Header/Header.jsx";
import Login from './pages/Login/Login.jsx'
import Home from './pages/Home/Home.jsx'
import './App.css';
import MyHabits from "./pages/MyHabits/MyHabits.jsx";
import Archives from "./pages/Archives/Archives.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import NewHabit from "./pages/NewHabit/NewHabit.jsx";
import Register from "./pages/Register/Register.jsx";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {
    const { isAuth } = useContext(AuthContext);
  return (
    <>
        <Header />
        <main>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/habits" element={<MyHabits />} />
                <Route path="/createhabit" element={<NewHabit />} />
                <Route path="/archive" element={<Archives />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </main>
        <footer className="footer">
            <p> ©BF, 2026</p>
        </footer>
    </>
  )
}

export default App
