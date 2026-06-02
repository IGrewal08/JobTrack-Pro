import { useState } from "react";

const JOB_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];

const POSTED_WITHIN = [
    { label: "Any time", value: "" },
    { label: "Last 24 hours", value: "1" },
    { label: "Last week", value: "7" },
    { label: "Last month", value: "30" },
];

type Props = {
    companies: string[];
    locations: string[];
    tags: string[];
    onSubmit: (filters: FilterValues) => void;
};

export type FilterValues = {
    search: string;
    jobTypes: string[];
    companies: string[];
    locations: string[];
    tags: string[];
    remote: string;
    postedWithin: string;
    salaryMin: string;
    salaryMax: string;
    sort: string;
};

export function JobFilters({ companies, locations, tags, onSubmit }: Props) {

    const [companySearch, setCompanySearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [tagSearch, setTagSearch] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        onSubmit({
            search: data.get("search") as string,
            jobTypes: data.getAll("jobTypes") as string[],
            companies: data.getAll("company") as string[],
            locations: data.getAll("location") as string[],
            tags: data.getAll("tag") as string[],
            remote: data.get("remote") as string,
            postedWithin: data.get("postedWithin") as string,
            salaryMin: data.get("salaryMin") as string,
            salaryMax: data.get("salaryMax") as string,
            sort: data.get("sort") as string,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search</label>
            <input id="search" name="search" type="text" placeholder="Title, keyword..." />

            <details>
                <summary>Job Type</summary>
                    {JOB_TYPES.map(type => (
                        <label key={type}>
                            <input type="checkbox" name="jobType" value={type} />
                            {type.replace("_", " ")}
                        </label>
                    ))}
            </details>

            <details>
                <summary>Company</summary>
                <input 
                    type="text" 
                    placeholder="Search companies..." 
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                />
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {companies.filter(c => c.toLowerCase().includes(companySearch.toLowerCase()))
                    .map(c => (
                        <li key={c}>
                            <label>
                                <input type="checkbox" name="company" value={c} />
                                {c}
                            </label>
                        </li>
                    ))}
                </ul>
            </details>

            <details>
                <summary>Location</summary>
                <input 
                    type="text"
                    placeholder="Search locations..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                />
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {locations.filter(l => l.toLowerCase().includes(locationSearch.toLowerCase()))
                    .map(l => (
                        <li key={l}>
                            <label>
                                <input type="checkbox" name="location" value={l} />
                                {l}
                            </label>
                        </li>
                    ))}
                </ul>
            </details>

            <details>
                <summary>Skills / Tags</summary>
                <input 
                    type="text"
                    placeholder="Search skills..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                />
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {tags.filter(t => t.toLowerCase().includes(tagSearch.toLowerCase()))
                    .map(t => (
                        <li key={t}>
                            <label>
                                <input type="checkbox" name="tag" value={t} />
                                {t}
                            </label>
                        </li>
                    ))}
                </ul>
            </details>

            <label htmlFor="remote">Work Type</label>
            <select id="remote" name="remote" defaultValue="">
                <option value="">All</option>
                <option value="true">Remote only</option>
                <option value="false">On-site only</option>
            </select>

            <label htmlFor="postedWithin">Posted Within</label>
            <select id="postedWithin" name="postedWithin" defaultValue="" >
                {POSTED_WITHIN.map(({ label, value }) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>

            <details>
                <summary>Salary</summary>
                <label htmlFor="salaryMin">Min</label>
                <input type="number"id="salaryMin" name="salaryMin" min={0} />

                <label htmlFor="salaryMax">Max</label>
                <input type="number" id="salaryMax" name="salaryMax" min={0}/>
            </details>

            <label htmlFor="sort">Sort By</label>
            <select id="sort" name="sort" defaultValue="newest">
                <option value="newest">Date - Newest</option>
                <option value="oldest">Date - Oldest</option>
                <option value="salaryDesc">Salary - High to Low</option>
                <option value="salaryAsc">Salary - Low to High</option>
            </select>
            
            <button type="submit">Search</button>
            <button type="reset">Clear</button>
        </form>
    );
}