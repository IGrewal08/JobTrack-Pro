import { Links, Meta, Outlet, Scripts } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorPage from "./routes/ErrorPage";

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

export function ErrorBoundary() {
    return <ErrorPage />;
}