import useAuthHook from "@/hooks/auth";
import { createContext, useContext } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { token, user, isAuthenticated, login, clearAuth } = useAuthHook();
    
    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, login, clearAuth  }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => { return useContext(AuthContext) }