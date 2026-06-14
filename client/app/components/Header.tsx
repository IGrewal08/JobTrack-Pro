import { NavLink, Link } from "react-router";

export default function Header() {
    return (
        <>
            <Link to="/">
                Dashboard
            </Link>
            <NavLink to="">
                Board
            </NavLink>
            <NavLink to="">
                Sign-In
            </NavLink>
        </>
    );
}