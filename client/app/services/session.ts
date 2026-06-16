import { redirect } from "react-router";

// Get session from request
export function getTokenFromRequest(request: Request): string | null {
    const cookieHeader = request.headers.get("Cookie") ?? "";
    const token = cookieHeader
        .split(";")
        .map(c => c.trim())
        .find(c => c.startsWith("token="))
        ?.split("=")[1];

    return token ?? null;
}

// Get token or redirect to login
export async function requireToken(request: Request): Promise<string> {
    console.log(request);
    const token = getTokenFromRequest(request);
    console.log(token);
    if (!token) throw redirect("/login");
    return token;
}