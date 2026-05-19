import type { DragEvent } from "react";
type Props = {
    data: Data;
    handleDrop: (e: DragEvent<HTMLDivElement>, id: string) => void;
    handleDragStart: (e: DragEvent<HTMLLIElement>, id: string, columnId: string) => void;
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
}

type Data = {
    id: string;
    title: string;
    applications: Applications[];
}

type Applications = {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    company: string;
    jobType: string;
    status: string;
}

export function KanbanColumn(props: Props) {
    // on click, go to job posting, on drag allow drag and drop
    return (
        <>
            <div 
                onDragOver={(e) => props.handleDragOver(e)}
                onDrop={(e) => props.handleDrop(e, props.data.id)}
                >
                <div id="title">{props.data.title}</div>
            <ul>
                {props.data.applications.map(app => (
                    <li key={app.id} 
                        draggable
                        onDragStart={(e) => props.handleDragStart(e, app.id, props.data.id)}
                    >
                        <div>{app.title}</div>
                        <div>{app.company}</div>
                        <div>{app.createdAt}</div>
                    </li>
                ))}
            </ul>
            </div>
        </>
    )
}