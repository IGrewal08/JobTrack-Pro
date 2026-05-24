import { useLoaderData } from "react-router";
import { API_BASE } from "../services/api";
import { getValidToken } from "../services/util";
import { JobList } from "../components/Board/JobList";
import type { Job } from "../types";

export async function loader() {
    const token = getValidToken();
    if (!token) throw new Response("Unauthorized", { status: 401 });

    const res = await fetch(`${API_BASE}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}`},
    });

    if (!res.ok) throw new Response("Failed to load jobs:", { status: res.status });
    const jobs: Job[] = await res.json();
    return { jobs };
}

export default function JobsPage() {
    const { jobs } = useLoaderData<typeof loader>();
    return <JobList jobs={jobs}/>;
}