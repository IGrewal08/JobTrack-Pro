import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import type { Job } from "../../types";

type Props = { jobs: Job[] };

export function JobList({ jobs }: Props) {
    const { authRequest } = useAuthContext();
    const [jobs, setJobs] = useState<Job[]>();

    return <></>;
}