import { useLoaderData } from "react-router";
import KanbanBoard from "../components/Board/KanbanBoard";


export async function loader() {
    const response = await fetch(`http://localhost:3000/api/applications/`);
    return response.json();
}

export async function action() {

}

export default function BoardPage() {
    const applications = useLoaderData();
    return <KanbanBoard applications={applications} />; // Only return array of items
}