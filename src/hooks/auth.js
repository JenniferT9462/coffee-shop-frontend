import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("token");
    console.log("Retrieved token from localStorage:", t);

    if (t) {
        setToken(t);
        // ?? How to set isAuthenticated ??
        setIsAuthenticated(true);
    }

    const u = localStorage.getItem("user");
    console.log("Retrieved user from localStorage (before parsing):", u);

 

    if (u) {
      try {
        const parsedUser = JSON.parse(u);
        console.log("Parsed user object:", parsedUser)
        setUser(parsedUser);
      } catch (error) {
            console.error("❌ Error parsing user JSON:", error);
            console.error("⚠️ Corrupted user data:", u);
            localStorage.removeItem("user");
      } 
    } else {
        console.warn("⚠️ No user data found in localStorage.");
    }
    
    }, []);

  return { user, token, isAuthenticated };
}
