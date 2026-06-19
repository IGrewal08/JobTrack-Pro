import { Links, Meta, Outlet, Scripts } from "react-router";
import styles from "./styles/Body.module.css";

export default function Root() {
    return (
        <html style={{ 
            margin: 0,
            padding: 0,
            height: "100%",
        }}>
            <head>
                <Meta /><Links />
            </head>
            <body 
                id={styles.body}
                style={{
                    minHeight: "100dvh",
                    flexDirection: "column",
                    overflowX: "hidden",
                }}
            >
                <Outlet />
                <Scripts />
            </body>
        </html>
    );
}