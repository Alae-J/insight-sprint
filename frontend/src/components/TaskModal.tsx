
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: TaskFormData) => void;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: Date | null;
  project: string;
  isAiGenerated: boolean;
}

// Sample project data - in a real app, this would come from an API
const projects = [
    { id: "1", name: "Website Redesign" },
    { id: "2", name: "API Integration" },
    { id: "3", name: "Mobile App" },
];

export function TaskModal({ isOpen, onClose, onSubmit }: TaskModalProps) {
    const [formData, setFormData] = useState<TaskFormData>({
        title: "",
        description: "",
        dueDate: null,
        project: "",
        isAiGenerated: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, isAiGenerated: e.target.checked }));
    };

    const handleDateSelect = (date: Date | undefined) => {
        setFormData((prev) => ({ ...prev, dueDate: date || null }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.title) {
        toast.error("Validation Error", {
            description: "Title is required"
        });
        return;
        }
        
        if (!formData.dueDate) {
        toast.error("Validation Error", {
            description: "Due date is required"
        });
        return;
        }

        setIsSubmitting(true);
        
        try {
        // In a real app, this would be an API call
        // await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(formData) })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        onSubmit(formData);
        
        toast.success("Task created successfully");
        onClose();
        } catch (error) {
        toast.error("Error", {
            description: "Failed to create task. Please try again."
        });
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Create New Task</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-text-primary dark:text-gray-200">
                Title*
                </label>
                <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className="w-full"
                />
            </div>
            
            <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-text-primary dark:text-gray-200">
                Description
                </label>
                <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                className="w-full resize-none"
                rows={3}
                />
            </div>
            
            <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary dark:text-gray-200">
                Due Date*
                </label>
                <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dueDate && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? (
                        format(formData.dueDate, "PPP")
                    ) : (
                        <span>Select a date</span>
                    )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                    mode="single"
                    selected={formData.dueDate || undefined}
                    onSelect={handleDateSelect}
                    initialFocus
                    className="pointer-events-auto"
                    />
                </PopoverContent>
                </Popover>
            </div>

            <div className="space-y-2">
                <label htmlFor="project" className="block text-sm font-medium text-text-primary dark:text-gray-200">
                Project
                </label>
                <select
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 dark:bg-gray-700"
                >
                <option value="">Select a project</option>
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                    {project.name}
                    </option>
                ))}
                </select>
            </div>

            <div className="flex items-center space-x-2">
                <input
                type="checkbox"
                id="isAiGenerated"
                checked={formData.isAiGenerated}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300 dark:border-gray-700 text-primary-blue"
                />
                <label htmlFor="isAiGenerated" className="text-sm font-medium text-text-primary dark:text-gray-200">
                AI-Generated?
                </label>
            </div>

            <DialogFooter className="pt-4">
                <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
                Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Task"}
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    );
}
