import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken, logout } from "@/lib/auth";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        try {
            const { exp }: any = jwtDecode(token);  // Decode JWT token
            const isExpired = exp * 1000 < Date.now();  // Check if token is expired
            if (isExpired) {
                logout();  // Log out if token is expired
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(true);  // Token is valid and not expired
            }
        } catch {
            logout();  // In case of a decode error, log out
            setIsAuthenticated(false);
        }
    }, []);

    return { isAuthenticated };
};
