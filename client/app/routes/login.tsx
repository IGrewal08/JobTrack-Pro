import { redirect } from "react-router";
import { LoginForm } from "../components/Auth/LoginForm";
import type { Route } from "../../.react-router/types/app/routes/+types/login";
import { API_BASE } from "../services/api";
import { getSession, sessionStorage } from "../services/session";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(request);
    if (session.get("token")) throw redirect("/board");
    return {};
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        return { error: body.message ?? "Login failed" };
    }

    const { token, user } = await res.json();
    const session = await getSession(request);
    session.set("token", token);
    session.set("user", user);

    throw redirect("/board", {
        headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
    });
}

export default function LoginPage() {
    return <LoginForm />;
}