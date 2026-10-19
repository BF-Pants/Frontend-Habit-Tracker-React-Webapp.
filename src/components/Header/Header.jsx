import "./Header.css";
import {NavLink, useNavigate} from "react-router-dom";

/*TODO  Turn the Header function into a reusable component */
function Header() {
    const navigate = useNavigate();
    return (
        <header className="header">
            <button className="logo-button" type="button" onClick={() => navigate('/')}>
                <img
                    className="header-logo"
                    src="src/assets/Logo/HeaderLogo.png"
                    alt="Habbit Buddy Logo, links to homepage"
                />
            </button>
            <nav className="main-navigation">

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
                    </ul>
            </nav>
        </header>

    )
}
export default Header;