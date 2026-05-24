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

export type Job = {
    id: string;
    createdAt: string;
    company: string;
    location: string;
    remote: boolean;
    salaryMin: string | undefined;
    salaryMax: string | undefined;
    description: string;
    url: string;
    postedAt: string | undefined;
    expiresAt: string | undefined;
}