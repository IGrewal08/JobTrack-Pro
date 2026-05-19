import { redirect } from "react-router";

export async function loader() {
    const user = await getUser(); // check for token
    if (user) return redirect("/board");
    return redirect("/login");
}

function getUser() {
    return localStorage.getItem("token");
}
