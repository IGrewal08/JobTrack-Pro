import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

type Filters = {

}

export function Filtering() {
    const { authRequest } = useAuthContext();

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<Filters | undefined>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Search</label>
                <input />

                <label>Job Type</label>
                <input />

                <label>Company</label>
                <input />

                <label>Location</label>
                <input />

                <label>Remote</label>
                <select>
                    <option value="false" selected>All</option>
                    <option value="true">Remote</option>
                </select>

                <label>Date Created</label>
                <select>
                    <option value="new" selected>New</option>
                    <option value="old">Old</option>
                </select>

                <button type="submit">Search</button>
            </form>
        </>
    );
}