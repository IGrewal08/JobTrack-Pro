import { redirect } from "react-router";

const isBrowser = typeof window !== "undefined";

export async function loader() {
    const user = await getUser(); // check for token
    if (user) return redirect("/board");
    return redirect("/login");
}

function getUser() {
    if (!isBrowser) return null;
    return localStorage.getItem("token");
}
