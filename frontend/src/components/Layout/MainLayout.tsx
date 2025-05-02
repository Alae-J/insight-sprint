
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const location = useLocation();
    
    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(isDark);
        if (isDark) {
        document.documentElement.classList.add('dark');
        } else {
        document.documentElement.classList.remove('dark');
        }
        
        // Check if sidebar state is stored in localStorage
        const storedSidebarState = localStorage.getItem('sidebarCollapsed');
        if (storedSidebarState) {
        setSidebarCollapsed(storedSidebarState === 'true');
        }
    }, []);

    // Update sidebar state when route changes on mobile
    useEffect(() => {
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
        setSidebarCollapsed(true);
        }
    }, [location.pathname]);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', String(newMode));
        
        if (newMode) {
        document.documentElement.classList.add('dark');
        } else {
        document.documentElement.classList.remove('dark');
        }
    };

    const toggleSidebar = (collapsed: boolean) => {
        setSidebarCollapsed(collapsed);
        localStorage.setItem('sidebarCollapsed', String(collapsed));
    };

    return (
        <div className="min-h-screen bg-gray-light dark:bg-gray-dark">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
            <Header 
            toggleDarkMode={toggleDarkMode} 
            isDarkMode={isDarkMode} 
            sidebarCollapsed={sidebarCollapsed}
            />
            
            <main className="container mx-auto p-6">
            <Outlet />
            </main>
        </div>
        </div>
    );
};

export default MainLayout;
