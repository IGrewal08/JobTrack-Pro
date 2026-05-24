import { createContext, useContext } from "react";
import { useAuth } from "../services/api";

// Share user, token, and logout state across app
const AuthContext = createContext(null);
export function AuthProvider({ children }) { 
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext);