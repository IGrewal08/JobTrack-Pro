import { useNavigate  } from "react-router";
import { useState } from "react";
import { useAuth } from "../../services/api";

export function LoginForm() {
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
        if (!error) navigate('/board');
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
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
                {loading ? "Loading in.." : "login"}
            </button>
        </form>
    );
}