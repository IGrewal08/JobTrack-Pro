import { useState } from "react";
import type { Job } from "../../types";
import { JobCard } from "./JobCard";
import { authFetch } from "../../services/api";

type Props = { 
    jobs: Job[];
    token: string;
};

type ListCard = {
    id: string;
    title: string;
    company: string;
    createdAt: string;
    tags: string[];
    isSelected: boolean;
    onClick: (jobId: string) => void;
};

export function JobList({ jobs, token }: Props) {
    const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] ?? null);

    const handleSave = async (formData: FormData, jobId: string) => {
        try {
            await authFetch("/api/applications", token, {
                method: "POST",
                body: JSON.stringify({
                    jobId,
                    status: formData.get("status"),
                    appliedAt: formData.get("appliedAt") || undefined,
                    interviewAt: formData.get("interviewedAt") || undefined,
                    offerAmount: formData.get("offerAmount") || undefined,
                    notes: formData.get("notes") || undefined,
                    coverLetter: formData.get("coverLetter") || undefined,
                }),
            });
        } catch (err) {
            console.error("Failed to save application:", err);
        }
    };

    const handleDelete = async (jobId: string) => {
        try {
            await authFetch(`/api/applications/${jobId}`, token, { method: "DELETE" });
            if (selectedJob?.id === jobId) setSelectedJob(jobs[0] ?? null);
        } catch (err: any) {
            console.error("Failed to delete:", err.message);
        }
    }

    const handleCardClick = (jobId: string) => {
        const found = jobs.find(job => job.id === jobId);
        if (found) setSelectedJob(found);
    };

    // Functions for filter/sorting/etc

    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <ul style={{ listStyle: "none", padding: 0, width: "320px", overflowY: "auto" }}>
                {jobs.map(job => (
                    <li key={job.id}>
                        <ListCard 
                            id={job.id}
                            title={job.title}
                            company={job.company}
                            createdAt={job.createdAt}
                            tags={job.tags}
                            isSelected={selectedJob?.id === job.id}
                            onClick={handleCardClick}
                        />
                    </li>
                ))}
            </ul>

            <div style={{ flex: 1 }}>
                {selectedJob 
                    ? <JobCard data={selectedJob} onSave={handleSave} onDelete={handleDelete} />
                    : <p>Select a job to view details</p>
                }
            </div>
        </div>
    );
}

function ListCard({ id, title, company, createdAt, tags, isSelected, onClick }: ListCard) {
    return (
        <div 
            onClick={(_e) => onClick(id)}
            style={{ background: isSelected ? "#e6f1b" : "transparent", cursor: "pointer", padding: "0.5rem" }}
        >
            <h1>{title}</h1>
            <p>{company}</p>
            <p>{new Date(createdAt).toLocaleDateString()}</p>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "4px" }}>
                {tags.map(tag => (
                    <li key={tag}>{tag}</li>
                ))}  
            </ul>
        </div>
    );
}