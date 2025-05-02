
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban,
  Lightbulb, 
  CheckSquare, 
  Search, 
  Settings,
  Menu,
  X,
  UserCircle
} from 'lucide-react';
import Logo from '../Logo';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed: propCollapsed, onToggle }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(propCollapsed || false);
  const location = useLocation();

  // Update internal state when prop changes
  useEffect(() => {
    if (propCollapsed !== undefined) {
      setCollapsed(propCollapsed);
    }
  }, [propCollapsed]);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FolderKanban },
    { name: 'Ideas', href: '/ideas', icon: Lightbulb },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Knowledge', href: '/search', icon: Search },
    { name: 'Profile', href: '/profile', icon: UserCircle },
    { name: 'Admin', href: '/admin/users', icon: Settings },
  ];

  const toggleSidebar = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    if (onToggle) {
      onToggle(newCollapsed);
    }
  };

  return (
    <>
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow"
        onClick={toggleSidebar}
        aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
      >
        {collapsed ? <Menu size={24} /> : <X size={24} />}
      </button>
      
      <aside className={`
        fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-40
        ${collapsed ? 'w-16 sm:w-20' : 'w-64'}
        ${collapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-4 flex items-center justify-center">
            {!collapsed && (
              <Link to="/dashboard" className="text-xl font-bold text-text-primary dark:text-white">
                <Logo />
              </Link>
            )}
            {collapsed && (
              <Link to="/dashboard" className="mx-auto" aria-label="Dashboard">
                <Logo size="mini" />
              </Link>
            )}
            <button 
              className="hidden lg:block text-gray-500 hover:text-text-primary dark:text-gray-400 dark:hover:text-white ml-auto"
              onClick={toggleSidebar}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>

          <nav className="flex-1 mt-8 px-2">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href === '/dashboard' && location.pathname === '/');
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        flex items-center px-2 py-3 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-primary-blue/10 text-primary-blue' 
                          : 'text-text-secondary hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                        }
                        focus:ring-2 focus:ring-primary-blue focus:outline-none
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <item.icon size={20} className={`${collapsed ? 'mx-auto' : 'mr-3'}`} />
                      {!collapsed && (
                        <span className="transition-opacity duration-300">{item.name}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {!collapsed && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-blue flex items-center justify-center text-white">
                  JS
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-xs text-text-secondary dark:text-gray-400">Admin</p>
                </div>
              </div>
            )}
            {collapsed && (
              <div className="w-8 h-8 mx-auto rounded-full bg-primary-blue flex items-center justify-center text-white">
                JS
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
