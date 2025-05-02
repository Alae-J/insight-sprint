import React from 'react';
import { Bell, Sun, Moon } from 'lucide-react';
import Logo from '../Logo';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
    toggleDarkMode: () => void;
    isDarkMode: boolean;
    sidebarCollapsed?: boolean;
}

// Helper function to get page title based on current route
const getPageTitle = (pathname: string) => {
    if (pathname.startsWith('/meetings/')) return 'Meeting Workspace';
    if (pathname.startsWith('/projects/') && pathname.includes('/meetings')) return 'Meetings';
    
    const routes: Record<string, string> = {
        '/dashboard': 'Dashboard',
        '/projects': 'Projects',
        '/ideas': 'Ideas',
        '/tasks': 'Tasks',
        '/search': 'Knowledge Search',
        '/profile': 'Profile',
        '/admin/users': 'User Management',
    };
    
    return routes[pathname] || 'Dashboard';
};

const Header = ({ toggleDarkMode, isDarkMode, sidebarCollapsed = false }: HeaderProps) => {
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);
    
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className={`lg:hidden transition-all duration-300 ${sidebarCollapsed ? 'opacity-100' : 'opacity-0'}`}>
                <Logo className="text-primary-blue" />
                </div>
                
                <div className="flex-1 lg:flex-none transition-all duration-300">
                    <h1 className={`text-xl font-semibold text-text-primary dark:text-white ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'} transition-all duration-300`}>
                        {pageTitle}
                    </h1>
                </div>
                    
                <div className="flex items-center space-x-4">
                    <button 
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        aria-label="Notifications"
                    >
                        <Bell size={20} className="text-text-secondary dark:text-gray-300" />
                    </button>
                    
                    <button 
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        onClick={toggleDarkMode}
                        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {isDarkMode ? (
                        <Sun size={20} className="text-text-secondary dark:text-gray-300" />
                        ) : (
                        <Moon size={20} className="text-text-secondary" />
                        )}
                    </button>
                    
                    <div className="w-8 h-8 rounded-full bg-primary-blue flex items-center justify-center text-white">
                        JS
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
