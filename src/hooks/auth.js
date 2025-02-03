import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Getting user and token form local storage");

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("❌ Error parsing user JSON:", error);
        localStorage.removeItem("user");
      }
    }

    // const t = localStorage.getItem("token");
    // console.log("Retrieved token from localStorage:", t);

    // if (t) {
    //     setToken(t);
    //     // ?? How to set isAuthenticated ??
    //     setIsAuthenticated(true);
    // } else {
    //   setIsAuthenticated(false);
    // }

    // const u = localStorage.getItem("user");
    // console.log("Retrieved user from localStorage (before parsing):", u);

    // if (u) {
    //   try {
    //     const parsedUser = JSON.parse(u);
    //     console.log("Parsed user object:", parsedUser)
    //     setUser(parsedUser);
    //   } catch (error) {
    //         console.error("❌ Error parsing user JSON:", error);
    //         console.error("⚠️ Corrupted user data:", u);
    //         localStorage.removeItem("user");
    //   }
    // } else {
    //     console.warn("⚠️ No user data found in localStorage.");
    //     setUser(null)
    // }
  }, []);

  // Update authentication status when token changes
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  // Function to manually update authentication state
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setIsAuthenticated(true);
  };

  // Function to clear auth data manually (e.g., after logout)
  const clearAuth = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return { user, token, isAuthenticated, login, clearAuth };
}
