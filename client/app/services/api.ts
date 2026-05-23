import { useCallback, useEffect, useState } from "react";
import { clearToken, decodeToken, getValidToken, storeToken } from "./util";

export const API_BASE = "http://localhost:3000";

export function useAuth() {
    const [user, setUser] = useState<Record <string, any> | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check for existing token on initial load
    useEffect(() => {
        const existing = getValidToken();
        if (existing) {
            setToken(existing);
            setUser(decodeToken(existing));
        }
        setLoading(false);
    }, []);

    // Store new token to local storage
    const login = useCallback(async (email: string, password: string) => {
        setError(null);
        setLoading(true);
        try { 
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const body = await response.json().catch(() => ({}));
                throw new Error(body.message ?? `Login failed ${response.status}`);
            }

            // store token
            const { token: newToken } = await response.json();
            storeToken(newToken); // save token to localStorage
            setToken(newToken);
            setUser(decodeToken(newToken));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Remove token after logout
    const logout = useCallback(() => {
        clearToken();
        setToken(null);
        setUser(null);
    }, []);

    // Authenticate token after every request
    const authRequest = useCallback(async (path: string, options: any) => {
        const currentToken = getValidToken();
        const optionsHeader = {
            headers: options.headers ?? {},
        }
        if (!currentToken) {
            logout();
            throw new Error("Session expired. Please log in again.");
        }
        const response = await fetch(`${API_BASE}${path}`, {
            ...optionsHeader,
            headers: {
                "Content-Type": "application/json",
                ...optionsHeader.headers,
                Authorization: `Bearer ${currentToken}`,
            },
        });

        // Server side token rejection
        if (response.status === 401) {
            logout();
            throw new Error("Session expired. Please log in again.");
        }

        if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            throw new Error(body.message ?? `Request failed (${response.status})`);
        }

        return await response.json(); // valid response
    }, [logout]);

    return {user, token, loading, error, login, logout, authRequest }
}