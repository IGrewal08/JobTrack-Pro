import { useState } from "react";

type Applications = {
    applications: string[] | string;
}

export default function KanbanBoard(applications: Applications) {
    const [application, setApplications] = useState();
    return (
        <>
        </>
    );
}