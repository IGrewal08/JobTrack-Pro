export type Column = Application[];

export type Application = {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    company: string;
    jobType: string;
    status: string;
}

export type Columns = {
    [key: string]: {
        id: string;
        title: string;
        applications: Application[];
    };
}

export type DraggedObject = {
    id: string;
    columnId: string;
}