import "./Header.css";
import {NavLink, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";


function Header() {
    const navigate = useNavigate();
    const { isAuth, logout} = useContext(AuthContext);

    function navContext() {
        isAuth.isAuth ? navigate("/home") : navigate("/");
    }

    return (
        <header className="header">
            <button className="logo-button" type="button" onClick={navContext}>
                <img
                    className="header-logo"
                    src="src/assets/Logo/HeaderLogo.png"
                    alt="Habbit Buddy Logo, links to homepage"
                />
            </button>
            <nav className="main-navigation">
                {isAuth.isAuth ?
                    <ul className="nav-link">
                        <li>
                            <NavLink to="/home">{({isActive}) => isActive ? "active-link" : "default-link"}Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/habits">{({isActive}) => isActive ? "active-link" : "default-link"}Habits</NavLink>
                        </li>
                        <li>
                            <NavLink to="/archive">{({isActive}) => isActive ? "active-link" : "default-link"}Archive</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">{({isActive}) => isActive ? "active-link" : "default-link"}About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">{({isActive}) => isActive ? "active-link" : "default-link"}Contact</NavLink>
                        </li>
                        <li>
                            <NavLink to="/" onClick={logout}>{({isActive}) => isActive ? "active-link" : "default-link"}Logout</NavLink>
                        </li>
                    </ul>
                    :
                    <ul className="nav-link">
                        <li>
                            <NavLink to="/">{({isActive}) => isActive ? "active-link" : "default-link"}Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">{({isActive}) => isActive ? "active-link" : "default-link"}Register</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">{({isActive}) => isActive ? "active-link" : "default-link"}About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">{({isActive}) => isActive ? "active-link" : "default-link"}Contact</NavLink>
                        </li>
                    </ul>
                }
            </nav>
        </header>

    )
}
export default Header;