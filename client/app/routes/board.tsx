import { useLoaderData } from "react-router";
import KanbanBoard from "../components/Board/KanbanBoard";
import { getValidToken } from "../services/util";
import type { Application } from "../types";

export async function loader() {
    const token = getValidToken();
    if (!token) throw new Response("Unauthorized", { status: 401 });

    const res = await fetch(`http://localhost:3000/api/applications/`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Response("Failed to load applications", { status: res.status });
    const applications: Applications[] = await res.json();
    return { applications };
}

export default function BoardPage() {
    const { applications } = useLoaderData<typeof loader>();
    return <KanbanBoard applications={applications} />;
}