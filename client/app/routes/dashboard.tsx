import { useLoaderData } from "react-router";
import StatsChart from "../components/Dashboard/StatsChart";
import { API_BASE } from "../services/api";
import { getValidToken } from "../services/util"
import type { Application } from "../types";

export async function loader() {
    const token = getValidToken();
    if (!token) throw new Response("Unauthorized", { status: 401 });

    const res = await fetch(`${API_BASE}/applications/`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Response("Failed to load applications", { status: res.status });
    const applications: Application[] = await res.json();
    return { applications };
}

export default function DashboardPage() {
    const { applications } = useLoaderData<typeof loader>();

    return (
        <StatsChart applications={applications} />
    )
}