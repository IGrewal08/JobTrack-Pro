import { useEffect, useState } from "react";
import type { DragEvent } from "react";
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

type DraggedObject = {
    id: string;
    columnId: string;
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
    const [draggedItem, setDraggedItem] = useState<DraggedObject | null>(null);

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

    const removeTask = (columnId: string, taskId: string) => {
        const updatedColumns = {...columns};

        updatedColumns[columnId].applications = updatedColumns[columnId].applications.
        filter(app => app.id !== taskId);
        setColumns(updatedColumns);
        // call backend (delete userid from application)
    }

    const handleDragStart = (e: DragEvent<HTMLLIElement>, id: string, columnId: string): void => {
        setDraggedItem({ id, columnId });
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>, targetId: string): void => {
        e.preventDefault();

        if (!draggedItem || draggedItem.id !== targetId) return;

        if (!draggedItem.columnId && !targetId) { // check if the source and target column exist
            const updatedColumns = {...columns};
            const movedApp = updatedColumns[draggedItem.columnId].applications.find(app => app.id === draggedItem.id);


            if (movedApp) {
                updatedColumns[draggedItem.columnId].applications = updatedColumns[draggedItem.columnId].applications.
                    filter(app => app.id != draggedItem.id); // remove task from source column

                updatedColumns[targetId].applications.push(movedApp); // add task to target column
                // call backend to update item status
                setColumns(updatedColumns);
            }
        }
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
                        handleDragStart={handleDragStart}
                        handleDragOver={handleDragOver}
                    />
                </li>
                ))}
            </ul>
        </>
    );
}