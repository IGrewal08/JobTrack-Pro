import { useState } from "react";
import styles from "../../styles/Dashboard.module.css";

import { 
    Pie, PieChart,
    BarChart, Bar,
    XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, 
    type PieSectorShapeProps,
    Sector,
    Rectangle
} from "recharts";
import type { Application } from "../../types";

type Props = { applications: Application[] };

const CHART_OPTIONS = [
    { value: "status", label: "Applications By Status" },
    { value: "time", label: "Applications Over Time" },
    { value: "rate", label: "Response Rate" },
    { value: "funnel", label: "Stage Conversion Funnel" },
    { value: "response", label: "Time To Response" },
] as const;

type ChartKey = typeof CHART_OPTIONS[number]["value"];


export default function StatsChart({ applications }: Props) {

    const [activeChart, setActiveChart] = useState<ChartKey>("status");
    
    return (
        <div id={styles.stats_container}>
            <h2>Charts</h2>
            <div>
                <label htmlFor="chart-select"></label>
                <select 
                    id="chart-select"
                    value={activeChart}
                    onChange={(e) => setActiveChart(e.target.value as ChartKey)}
                >
                    {CHART_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <div style={{ marginTop: "1rem" }}>
                    {activeChart === "status" && <AppsStatus applications={applications} />}
                    {activeChart === "time" && <AppsOverTime applications={applications} />}
                    {activeChart === "rate" && <ResponseRate applications={applications} />}
                    {activeChart === "funnel" && <StageConversion applications={applications} />}
                    {activeChart === "response" && <TimeToRespond applications={applications} />}
                </div>
            </div>
        </div>
    );
}

const STATUS_COLORS: Record<string, string> = {
    SAVED: "#378ADD", APPLIED: "#1D9E75", INTERVIEWING: "#BA7517",
    OFFER: "#639922", REJECTED: "#D85A30", WITHDRAWN: "#888780",
};

function AppsStatus({ applications }: Props) {

    const counts = applications.reduce<Record<string, number>>((acc, app) => {
        acc[app.status] = (acc[app.status] ?? 0) + 1;
        return acc;
    }, {});

    const data = Object.entries(counts).map(([name, value]) => ({ 
        name, 
        value, 
        fill: STATUS_COLORS[name] ?? "#ccc",
    }));

    return (
        <ResponsiveContainer width="100%" maxHeight={400} >
            <PieChart> 
                <Pie 
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={140}
                    paddingAngle={3}
                    shape={(props: PieSectorShapeProps) => (
                        <Sector {...props} fillOpacity={(props as any).fill} />
                    )}
                />
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

function AppsOverTime({ applications }: Props) {
    const byWeek = Array.from({ length: 8 }, (_, i) => {
        const start = new Date(Date.now() - (7 - i) * 7 * 86400000);
        const end = new Date(Date.now() - (6 - i) * 7 * 86400000);
        return {
            week: start.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            count: applications.filter(a => {
                const d = new Date(a.createdAt);
                return d >= start && d < end;
            }).length,
        };
    });

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={byWeek}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#378ADD" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

function ResponseRate({ applications }: Props) {
    const total = applications.filter(a => a.status !== "SAVED").length;
    const responded = applications.filter(a =>
    ["Interviewing", "OFFER", "REJECTED"].includes(a.status)
    ).length;
    const ghosted = total - responded;
    const data = [
        { name: "Responded", value: responded },
        { name: "No response", value: ghosted },
    ];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie 
                    data={data} 
                    dataKey="name" 
                    innerRadius={70} 
                    outerRadius={140} 
                    paddingAngle={3}
                    shape={(props: PieSectorShapeProps) => (
                        <Sector {...props} fillOpacity={(props as any).fill} />
                    )}
                />
                <Tooltip formatter={(v, n) => [`${v} (${total ? Math.round((Number(v)/total)*100) : 0}%)`, n]} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

function StageConversion({ applications }: Props) {
    const data = [
        { stage: "Applied", count: applications.filter(a => a.status !== "SAVED").length, fill: "#378ADD"},
        { stage: "Interviewing", count: applications.filter(a => ["INTERVIEWING", "OFFER"].includes(a.status)).length, fill: "#BA7517"},
        { stage: "Offer", count: applications.filter(a => a.status === "OFFER").length, fill: "#639922"},
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical">
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="stage" width={100} />
                <Tooltip />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} shape={(props: any) => <Rectangle {...props} fill={props.fill} />} />
            </BarChart>
        </ResponsiveContainer>
    );
}

function TimeToRespond({ applications }: Props) {
    const withBoth = applications.filter(a => a.appliedAt && a.interviewAt);
    const data = withBoth.map(a => ({
        company: a.job?.company ?? "Unknown",
        days: Math.round(
        (new Date(a.interviewAt!).getTime() - new Date(a.appliedAt!).getTime()) / 86400000
        ),
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="company" />
                <YAxis label={{ value: "days", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Bar dataKey="days" fill="#BA7517" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}