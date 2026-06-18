import { Links, Meta, Outlet, Scripts } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Root() {
    return (
        <html style={{ 
            margin: 0,
            padding: 0,
            height: "100%",
        }}>
            <head>
                <Meta />
                <Links />
            </head>
            <body style={{ 
                minHeight: "100dvh",
                display: "flex", 
                flexDirection: "column",
                overflowX: "hidden",
            }}>
                <Header />
                <Outlet />
                <Footer />
                <Scripts />
            </body>
        </html>
    );
}