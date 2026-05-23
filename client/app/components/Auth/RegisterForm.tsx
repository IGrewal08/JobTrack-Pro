import { useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE } from "../../services/api";

export function RegisterForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/auth/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.message ?? `Register failed ${res.status}`);
            }
            navigate("/login");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <label htmlFor="name">Name</label>
            <input 
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                id="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id="password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>
        </form>
    );
}