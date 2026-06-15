import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import StatsChart from "../components/Dashboard/StatsChart";
import { authFetch } from "../services/api";
import type { Application } from "../types";
import { requireToken } from "../services/session";
import { StatCard } from "../components/Dashboard/StatCard";

export async function loader({ request }: LoaderFunctionArgs) {
    const token = await requireToken(request);
    const applications: Application[] = await authFetch("/api/applications", token);

    const byStatus = applications.reduce<Record<string, number>>((acc, app) => {
        acc[app.status] = (acc[app.status] ?? 0) + 1;
        return acc;
    }, {});

    const totalApplied = applications.filter(a => a.status !== "SAVED").length;
    const gotResponse = applications.filter(a => ["INTERVIEWING", "OFFER", "REJECTED"].includes(a.status)).length;
    const responseRate = totalApplied ? Math.round((gotResponse / totalApplied) * 100) : 0;

    const withResponse = applications.filter(a => a.appliedAt && a.interviewAt);
    const avgDays = withResponse.length ? 
        Math.round(
            withResponse.reduce((sum, a) => 
                sum + (new Date(a.interviewAt!).getTime() - new Date(a.appliedAt!).getTime())
            , 0) / withResponse.length / 86400000
        )
    : null;

    return { applications, byStatus, totalApplied, gotResponse, responseRate, avgDays, total: applications.length };
}

export default function DashboardPage() {
    const {  applications, byStatus, totalApplied, gotResponse, responseRate, avgDays, total } = useLoaderData<typeof loader>();
    return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <StatCard label="Total Applications" value={total} sub="all time" accent="#378ADD" />
        <StatCard label="Response Rate" value={`${responseRate}%`} sub={`${gotResponse} of ${totalApplied}`} accent="#1D9E75" />
        <StatCard label="Avg Days to Interview" value={avgDays ? `${avgDays} days` : "—"} 
            sub={avgDays ? "days from apply to interview" : "no data yet"} accent="#BA7517"/>
        <StatCard label="Active Applications" value={byStatus["INTERVIEWING"] ?? 0} sub="currently interviewing" accent="#639922" />
      </div>
      <StatsChart applications={applications} />
    </div>
  );
}