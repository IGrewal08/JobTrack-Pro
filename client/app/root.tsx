import { Links, Meta, Outlet, Scripts } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Root() {
    return (
        <html>
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                <Outlet />
                <Footer />
                <Scripts />
            </body>
        </html>
    );
}