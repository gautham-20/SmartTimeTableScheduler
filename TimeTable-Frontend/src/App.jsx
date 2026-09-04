
import React from 'react';
import Dashboard from './Components/Dashboard';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Profile from './Components/Profile.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';





function App() {
  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
