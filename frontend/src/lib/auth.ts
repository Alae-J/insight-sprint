const TOKEN_KEY = "jwt";
const USER_ID_KEY = "user_id";

export const saveAuth = (token: string, userId: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_ID_KEY, userId);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserId = () => localStorage.getItem(USER_ID_KEY);

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    window.location.href = "/login";
};
