const TOKEN_KEY = "jwt";  // Key to store JWT token in localStorage

// Function to save the JWT token in localStorage
export const saveAuth = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

// Function to retrieve the JWT token from localStorage
export const getToken = () => localStorage.getItem(TOKEN_KEY);

// Function to remove the JWT token from localStorage and log out
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";  // Redirect to login page
};
