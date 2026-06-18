import { NavLink, useActionData, useNavigation  } from "react-router";
import styles from "../../styles/Login.module.css";

export function LoginForm() {
    const actionData = useActionData<{ error?: string }>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <main>
            <div id={styles.graphic}></div>
            <div id={styles.login_form}>
                <h5 style={{ color: "red" }}>{actionData?.error && <p>{actionData.error}</p>}</h5>
                <h2 style={{ marginBottom: "3rem", color: "royalblue" }}>Log-in To Your Account</h2>
                <form method="post">
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="@email" 
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        required 
                    />
                    <button id={styles.login} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
                <hr></hr>
                <h5 style={{ color: "slategray" }}>
                    Don't have an account?
                    <NavLink 
                        to="/register" 
                        style={{ textDecoration: "none", marginLeft: "0.5rem", fontWeight: "1px" }}>
                            Register!
                    </NavLink>
                </h5>
            </div>
        </main>
    );
}