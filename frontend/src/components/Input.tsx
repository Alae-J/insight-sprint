
import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, fullWidth = true, ...props }, ref) => {
    return (
      <div className={cn('mb-4', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-text-primary dark:text-gray-200 font-medium mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue dark:bg-gray-800 dark:text-white outline-none transition-colors',
            fullWidth && 'w-full',
            error && 'border-danger-red focus:border-danger-red focus:ring-danger-red',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-danger-red">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
