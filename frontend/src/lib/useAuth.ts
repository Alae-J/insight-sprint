import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken, logout } from "@/lib/auth";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (!token) return;

        try {
            const { exp }: any = jwtDecode(token);
            const isExpired = exp * 1000 < Date.now();
            if (isExpired) logout();
            else setIsAuthenticated(true);
        } catch {
            logout();
        }
    }, []);

    return { isAuthenticated };
};
