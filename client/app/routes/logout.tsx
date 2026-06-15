import { redirect } from "react-router";
import type { Route } from "../../.react-router/types/app/routes/+types/logout";
import { getSession, sessionStorage } from "../services/session";

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request);
    throw redirect("/login", {
        headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
    });
}