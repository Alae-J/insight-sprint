
import React from 'react';
import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger';
    className?: string;
}

const Badge = ({ 
    children, 
    variant = 'default',
    className 
}: BadgeProps) => {
    const variantClasses = {
        default: "bg-secondary-teal text-white",
        success: "bg-success-green text-white",
        warning: "bg-warning-yellow text-gray-900",
        danger: "bg-danger-red text-white",
    };

    return (
        <span
            className={cn(
                'inline-block text-sm font-medium px-2 py-1 rounded-full',
                variantClasses[variant],
                className
            )}
        >
            {children}
        </span>
    );
};

export default Badge;
