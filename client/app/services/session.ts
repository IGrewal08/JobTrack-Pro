import { createCookieSessionStorage, redirect } from "react-router";

type SessionData = {
    token: string;
    user: { id: string; role: string };
};

export const sessionStorage = createCookieSessionStorage<SessionData>({
    cookie: {
        name: "__session",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax", // CSRF protection
        maxAge: 60 * 60 * 24 * 7,
        secrets: [process.env.SESSION_SECRET ?? "dev-secret-change-in-prod"],
    },
});

// Get session from request
export function getSession(request: Request) {
    return sessionStorage.getSession(request.headers.get("Cookie"));
}

// Get token or redirect to login
export async function requireToken(request: Request): Promise<string> {
    const session = await getSession(request);
    const token = session.get("token");
    if (!token) throw redirect("/login");
    return token;
}

// get user or redirect to login
export async function requireUser(request: Request) {
    const session = await getSession(request);
    const user = session.get("user");
    if (!user) throw redirect("/login");
    return user;
}