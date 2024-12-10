import "./Navbar.scss"

import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__ul">
                <li className="navbar__li">
                    <NavLink to="/">Home</NavLink>
                </li>
                <li className="navbar__li">
                    <NavLink to="/about">About</NavLink>
                </li>
                <li className="navbar__li">
                    <NavLink to="/goose-images">Goose Images</NavLink>
                </li>
                <li className="navbar__li">
                    <NavLink to="/goose-facts">Goose Facts</NavLink>
                </li >
                <li className="navbar__li">
                    <NavLink to="/goose-bot">Goose Bot</NavLink>
                </li>
            </ul>

        </nav>
    )
}
export default Navbar