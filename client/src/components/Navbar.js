import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../images/l1.jpg"
import { UserContext } from '../App'


const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <li className="nav-item me-3">
                        <NavLink className="nav-link a" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item me-3">
                        <NavLink className="nav-link a" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item me-3">
                        <NavLink className="nav-link a" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item me-3">
                        <NavLink className="nav-link a" to="/logout">Logout</NavLink>
                    </li>
                </>
            )
        }
        else{
            return(
                <>
                    <li className="nav-item me-3">
                        <NavLink className="nav-link a" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item me-3">
                        <NavLink className="nav-link a" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item me-3">
                        <NavLink className="nav-link a" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item me-3">
                        <NavLink className="nav-link a" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item me-3">
                        <NavLink className="nav-link a" to="/signup">Registration</NavLink>
                    </li>
                </>
            )
        }
    
    } 
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary nav ">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#">
                        <img className='logo ml-5' src={logo} alt="logo" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <RenderMenu/>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
