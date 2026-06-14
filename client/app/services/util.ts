const TOKEN_KEY = "token";

const isBrowser = typeof window !== "undefined";

// Get user or null
export function decodeToken(token: string | null) {
    try {
        if (!token) return null;
        const payload = token.split(".")[1];
        const json = atob(payload.replace(/-/g, "+").replace(/_/g,"/"));
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export function isTokenExpired(token: string | null, bufferSeconds = 30) {
    if (!token) return true;
    const payload = decodeToken(token);
    if (!payload?.exp) return true;
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp - nowInSeconds < bufferSeconds;
}

export function storeToken(token: string | null) { 
    if (!isBrowser || !token) return;
    localStorage.setItem(TOKEN_KEY, token); 
}
export function loadToken():string | null { 
    if (!isBrowser) return null;
    return localStorage.getItem(TOKEN_KEY); 
}
export function clearToken() { 
    if (!isBrowser) return;
    localStorage.removeItem(TOKEN_KEY); 
}

export function getValidToken(): null | string {
    const token = loadToken();
    if (!token || isTokenExpired(token)) {
        clearToken();
        return null;
    }
    return token;
}