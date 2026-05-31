import { useState } from "react";
import type { Job } from "../../types";

type Props = {
    data: Job;
    onSave: (data: FormData, jobId: string) => void;
    onDelete: (jobId: string) => void;
}

export function JobCard({ data, onSave, onDelete }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onSave(formData, data.id);
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={() => onDelete(data.id)}>Remove</button>
            <h1>{data.title}</h1>
            <div style={{ display: "flex", gap: "1rem", padding: 0 }}>
                <h3>{data.company}</h3>
                <h3>{new Date(data.createdAt).toLocaleDateString()}</h3>
                <h3>{data.location}</h3>
                <h3>{data.remote ? "Remote" : "Not-Remote"}</h3>
            </div>
            <a href={data.url} target="_blank" rel="noreferrer">View Posting</a>
            <p>{data.description}</p>
            <div>
                <span>Min: {data.salaryMin ?? "-"}</span>
                <span>Max: {data.salaryMax ?? "-"}</span>
            </div>
            <div>
                <span>Posted At: {data.postedAt ? new Date(data.postedAt).toLocaleDateString() : "-"}</span>
                <span>Expires At: {data.expiresAt ? new Date(data.expiresAt).toLocaleDateString() : "-"}</span>
            </div>

            <button onClick={() => setIsOpen(true)}>Save to Board</button>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={() => setIsOpen(false)}>Close</button>
                        <h2>Save Application</h2>

                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <legend>Status</legend>
                                    {["SAVED", "APPLIED", "INTERVIEWING", "OFFER", "REJECTED", "WITHDRAWN"].map(s => (
                                        <label key={s}>
                                            <input 
                                                type="radio"
                                                name="status"
                                                value={s}
                                                defaultChecked={s === "SAVED"}
                                            />
                                            {s}
                                        </label>
                                    ))}
                            </fieldset>
                            
                            <label htmlFor="appliedAt">Applied At</label>
                            <input type="date" id="appliedAt" name="appliedAt" />

                            <label htmlFor="interviewAt">Interview At</label>
                            <input type="date" id="interviewAt" name="interviewAt" />

                            <label htmlFor="offerAmount">Offer Amount</label>
                            <input type="number" id="offerAmount" name="offerAmount" min={0} />

                            <label htmlFor="notes">Notes</label>
                            <textarea id="notes" name="notes" maxLength={250} />

                            <label htmlFor="coverLetter">Cover Letter</label>
                            <textarea id="coverLetter" name="coverLetter" maxLength={600} />

                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}