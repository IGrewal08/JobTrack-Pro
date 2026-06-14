import type { DragEvent } from "react";
import type { Application } from "../../types";

type ColumnData = { 
    id: string;
    title: string;
    applications: Application[]
};

type Props = {
    data: ColumnData;
    onDrop: (e: DragEvent<HTMLDivElement>, columnId: string) => void;
    onDragStart: (e: DragEvent<HTMLLIElement>, id: string, columnId: string) => void;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onRemove: (columnId: string, taskId: string) => void;
}

export function KanbanColumn({ data, onDrop, onDragStart, onDragOver, onRemove }: Props) {
    // on click, go to job posting, on drag allow drag and drop
    return (
        <div 
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, data.id)}
            style={{ minWidth: "200px", minHeight: "300px" }}
        >
            <h3>{data.title}</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {data.applications.map(app => (
                    <li 
                        key={app.id} 
                        draggable
                        onDragStart={(e) => onDragStart(e, app.id, data.id)}
                    >
                        <div>{app.job.title}</div>
                        <div>{app.job.company}</div>
                        <div>{new Date(app.createdAt).toLocaleDateString()}</div>
                        <button onClick={() => onRemove(data.id, app.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}