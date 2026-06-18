import { NavLink, useLocation } from "react-router";
import styles from "../styles/Header.module.css";

export default function Header() {
    const location = useLocation();

    return (
        <header id={styles.header}>
            <NavLink 
                to="/dashboard" 
                id={styles.toDash} 
                className={styles.links}
            >
                Dashboard
            </NavLink>
            <NavLink 
                to="/board" 
                id={styles.toBoard} 
                className={styles.links}
            >
                Userboard
            </NavLink>
            <NavLink
                to="/jobs"
                id={styles.toJob}
                className={styles.links}
            >
                Jobs
            </NavLink>
            {(location.pathname == "/login") 
                ? <NavLink 
                    to="/register" 
                    id={styles.toAuth} 
                    className={styles.links}>
                        Register
                 </NavLink>
                :  (location.pathname != "/login" && location.pathname == "/register")
                    ? <NavLink 
                        to="/login" 
                        id={styles.toAuth} 
                        className={styles.links}>
                        Login
                     </NavLink>
                    : <NavLink 
                        to="/logout"
                        id={styles.toAuth}
                        className={styles.links}
                    >
                        Logout
                     </NavLink>
            }
        </header>
    );
}