
import React from "react";
import Technologies from "./Commen/Technologies";
import  Login   from "./User/login";
import UserHome from "./User/Userhome";
import Register from "./User/Register";
import Home from "./Commen/Home";
import Navbar from "./Commen/Navbar";
import Contact from "./Commen/Contact";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeToggleButton from "./Commen/ThemeToggleButton";
import { useTheme } from "./Commen/ThemeContext";

function App() {
   const { theme } = useTheme();
   const appStyles = {};

  return (
    <div className="relative">
    <div style={appStyles} className="fixed bottom-4 left-4 z-10">
      <ThemeToggleButton />
    </div>

      <Navbar/>
      <Routes>
          
          <Route path="" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/home" element={<UserHome/>}/>
         

      </Routes>
      <Technologies/>
      <Contact/>




    </div>
    
  );
}

export default App;
