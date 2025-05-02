import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./../pages/NotFound";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import Dashboard from "./../pages/Dashboard";
import Projects from "./../pages/Projects";
import MeetingsList from "./../pages/MeetingsList";
import MeetingWorkspace from "./../pages/MeetingWorkspace";
import Ideas from "./../pages/Ideas";
import Tasks from "./../pages/Tasks";
import KnowledgeSearch from "./../pages/KnowledgeSearch";
import Profile from "./../pages/Profile";
import AdminUsers from "./../pages/AdminUsers";
import MainLayout from "./../components/Layout/MainLayout";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id/meetings" element={<MeetingsList />} />
                <Route path="/meetings/:id" element={<MeetingWorkspace />} />
                <Route path="/ideas" element={<Ideas />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/search" element={<KnowledgeSearch />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/users" element={<AdminUsers />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes