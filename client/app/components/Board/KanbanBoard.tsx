import { useEffect, useState } from "react";
import type { DragEvent } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { useAuthContext } from "../../context/AuthContext";
import type { Application, Columns, DraggedObject } from "../../types";

const COLUMN_KEYS = ["saved", "applied", "interviewing", "offers", "rejected", "withdrawn"];

// Build columns with empty applications arrays, return an object with key-value for each key as application state
const buildInitialColumns = (): Columns => 
    Object.fromEntries(
        COLUMN_KEYS.map(key => [key, { id: key, title: key.charAt(0).toUpperCase() + key.slice(1), applications: [] }])
    );

type Props = { applications: Application[] };

export default function KanbanBoard({ applications }: Props) {
    const { authRequest } = useAuthContext();
    const [columns, setColumns] = useState<Columns>(buildInitialColumns);
    const [draggedItem, setDraggedItem] = useState<DraggedObject | null>(null);

    useEffect(() => {
        const grouped: Record<string, Application[]> = Object.fromEntries(COLUMN_KEYS.map(k => [k, []]));
        applications.forEach(app => {
            const key = app.status.toLowerCase();
            if (grouped[key]) grouped[key].push(app);
        });
        setColumns(prev => {
            const next = { ...prev };
            COLUMN_KEYS.forEach(key => { next[key] = { ...next[key], applications: grouped[key] }; });
            return next;
        });
    }, [applications]);

    const handleDragStart = (_e: DragEvent<HTMLLIElement>, id: string, columnId: string) => {
        setDraggedItem({ id, columnId });
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = async (e: DragEvent<HTMLDivElement>, targetColumnId: string) => {
        e.preventDefault();

        // early return for no drop, or drop on same column
        if (!draggedItem || draggedItem.columnId !== targetColumnId) {
            setDraggedItem(null);
            return;
        }
        const { id, columnId: sourceColumnId } = draggedItem;
        const movedApp = columns[sourceColumnId]?.applications.find(app => app.id === id);
        if (!movedApp) { setDraggedItem(null); return; }

        setColumns(prev => {
            const next = { ...prev};
            next[sourceColumnId] = {
                ...next[sourceColumnId],
                applications: next[sourceColumnId].applications.filter(app => app.id !== id),
            };
            next[targetColumnId] = {
                ...next[targetColumnId],
                applications: [...next[targetColumnId].applications, { ...movedApp, status: targetColumnId }],
            };
            return next;
        });

        try {
            await authRequest(`/api/applications/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ status: targetColumnId.toUpperCase() }),
            });
        } catch (err) {
            console.error("Failed to update status:", err);
        }

        setDraggedItem(null);
    };

    const removeTask = async (columnId: string, taskId: string) => {

        setColumns(prev => ({
            ...prev,
            [columnId]: {
                ...prev[columnId],
                applications: prev[columnId].applications.filter(app => app.id !== taskId),
            },
        }));
        try {
            await authRequest(`/api/application/${taskId}`, { method: "DELETE" });
        } catch (err) {
            console.error("Failed to delete applications:", err);
        }
    };

    return (
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0 }}>
            {Object.entries(columns).map(([key, column]) => (
                <li key={key}>
                    <KanbanColumn 
                        data={column}
                        onDrop={handleDrop}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onRemove={removeTask}
                    />
                </li>
            ))}
        </ul>
    );
}