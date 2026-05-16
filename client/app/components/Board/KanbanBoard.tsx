import { useEffect, useState } from "react";
import { KanbanColumn } from "./KanbanColumn";

type Column = Applications[];

type Applications = {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    company: string;
    jobType: string;
    status: string;
}

const columnApps: {
    saved: Column;
    applied: Column;
    interviewing: Column;
    offers: Column;
    rejected: Column;
    withdrawn: Column;
    [key: string]: Column; // Dynamic lookup error below
} = { 
    saved: [], 
    applied: [], 
    interviewing: [], 
    offers: [], 
    rejected: [], 
    withdrawn: [] 
};

type Columns = {
    [key: string]: Individual;
}

type Individual = {
    id: string;
    title: string;
    applications: Applications[];
}

const initialColumns: Columns = {
    saved: { id: "Saved", title: "Saved", applications: [] },
    applied: { id: "Applied", title: "Applied", applications: [] },
    interviewing: { id: "Interviewing", title: "Interviewing", applications: [] },
    offers: { id: "Offers", title: "Offers", applications: [] },
    rejected: { id: "Rejected", title: "Rejected", applications: [] },
    withdrawn: { id: "Withdrawn", title: "Withdrawn", applications: [] },
}

export async function action() {

}

export default function KanbanBoard(apps: Applications[]) {

    const [applications, setApplications] = useState(apps);
    const [columns, setColumns] = useState(initialColumns);
    const [draggedItem, setDraggedItem] = useState(null);

    useEffect(() => {
        // Separate applications by their status into columns
        const columnApps: Record<string, Applications[]> = { 
            saved: [], 
            applied: [], 
            interviewing: [], 
            offers: [], 
            rejected: [], 
            withdrawn: [],
        }

        apps.forEach(app => {
            if (columnApps[app.status]) {
                columnApps[app.status].push(app);
            }
        });

        setApplications(apps);
        const newColumns = { ... columns };
        Object.keys(newColumns).forEach(key => {
            newColumns[key] = {
                ...newColumns[key],
                applications: columnApps[key] || []
            };
        });
        setColumns(newColumns);
    }, [applications]);

    const removeTask = (columnId: {}, taskId: string) => {
        const updatedColumns = {...columns};

        updatedColumns[columnId].apps = updatedColumns[columnId].apps.
        filter((app: string) => app.id !== taskId);
        // function call to action (delete user from id)
    }

    const handleDragStart = (columnId: number, item: Object) => {
    }

    const handleDragOver = (e: Event) => {
        e.preventDefault();
    }

    const handleDrop = (e: Event, columnId: number) => {
        e.preventDefault();

        if (!draggedItem) return;
        
        const {columnId: sourceColumnId, item} = draggedItem;

        if (sourceColumnId === columnId) return;

        const updatedColumns = {...columns};

        updatedColumns[sourceColumnId].apps = updatedColumns;
        [sourceColumnId].apps.filter((i: string) => i.id != item.id);

        updatedColumns[columnId].items.push(item);

        setColumns(updatedColumns);
        setDraggedItem(null);

    }

    return (
        <>
            <ul>
                {Object.entries(columns).map(([key, column]) => (
                <li key={key}>
                    <KanbanColumn 
                        data={column} 
                        handleDrop={handleDrop}
                    />
                </li>
                ))}
            </ul>
        </>
    );
}