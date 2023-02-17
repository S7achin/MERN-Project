import React, { createContext, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';
import { initialState, reducer } from './reducer/UseReducer';

// 1. context API
export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Errorpage />} />
    </Routes>
  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  )
}

export default App
