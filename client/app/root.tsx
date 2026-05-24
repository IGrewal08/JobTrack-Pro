import { Links, Meta, Outlet, Scripts } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

export default function Root() {
    return (
        <AuthProvider>
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
        </AuthProvider>
    );
}