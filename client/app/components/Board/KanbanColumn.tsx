type Props = {
    data: Data;
    handleDrop: () => void;
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
            <div id="title">{props.data.title}</div>
            <ul>
                {props.data.applications.map(app => (
                    <li key={app.id}>
                        <div>{app.title}</div>
                        <div>{app.company}</div>
                        <div>{app.createdAt}</div>
                    </li>
                ))}
            </ul>
        </>
    )
}