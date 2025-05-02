import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const Button = ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    className,
    ...props 
}: ButtonProps) => {
    const baseClasses = "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variantClasses = {
        primary: "bg-primary-blue hover:bg-blue-600 text-white focus:ring-primary-blue",
        secondary: "bg-secondary-teal hover:bg-teal-700 text-white focus:ring-secondary-teal",
        danger: "bg-danger-red hover:bg-red-600 text-white focus:ring-danger-red",
        outline: "bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-text-primary dark:text-white focus:ring-primary-blue",
    };

    const sizeClasses = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
        className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            className
        )}
        {...props}
        >
            {children}
        </button>
    );
};

export default Button;
