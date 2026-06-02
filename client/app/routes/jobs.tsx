import { useLoaderData } from "react-router";
import { API_BASE } from "../services/api";
import { getValidToken } from "../services/util";
import { JobList } from "../components/Board/JobList";
import type { Job } from "../types";
import { JobFilters, type FilterValues } from "../components/Board/JobFilters";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

export async function loader() {
    const token = getValidToken();
    if (!token) throw new Response("Unauthorized", { status: 401 });

    const res = await fetch(`${API_BASE}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}`},
    });

    if (!res.ok) throw new Response("Failed to load jobs:", { status: res.status });
    const jobs: Job[] = await res.json();

    const companies = [...new Set(jobs.map(j => j.company))];
    const locations = [...new Set(jobs.map(j => j.location).filter(Boolean))];
    const tags = [...new Set(jobs.flatMap(j => j.tags))];

    return { jobs, companies, locations, tags };
}

export default function JobsPage() {
    const { authRequest } = useAuthContext();
    const loaderData = useLoaderData<typeof loader>();

    const [jobs, setJobs] = useState<Job[]>(loaderData.jobs);
    const { companies, locations, tags } = loaderData;

    const handleFilterSubmit = async (filters: FilterValues) => {
        try {
            const params = new URLSearchParams();

            if (filters.search) params.set("search", filters.search);
            if (filters.remote) params.set("remote", filters.remote);
            if (filters.postedWithin) params.set("postedWithin", filters.postedWithin);
            if (filters.salaryMin) params.set("salaryMin", filters.salaryMin);
            if (filters.salaryMax) params.set("salaryMax", filters.salaryMax);
            if (filters.sort) params.set("sort", filters.sort);

            filters.jobTypes.forEach(v => params.append("jobType", v));
            filters.companies.forEach(v => params.append("company", v));
            filters.locations.forEach(v => params.append("location", v));
            filters.tags.forEach(v => params.append("tag", v));

            const filtered = await authRequest(`/api/jobs?${params.toString()}`, {
                method: "GET",
            });
            setJobs(filtered as Job[]);
        } catch (err: any) {
            console.error("Failed to fetch filtered jobs:", err.message);
        }
    };

    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <JobFilters 
                companies={companies} 
                locations={locations} 
                tags={tags} 
                onSubmit={handleFilterSubmit} 
            />
            <JobList jobs={jobs} />
        </div>
    );
}