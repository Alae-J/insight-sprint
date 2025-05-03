import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/projects/Projects";
import MeetingsList from "./pages/meetings/MeetingsList";
import MeetingWorkspace from "./pages/meetings/MeetingWorkspace";
import Ideas from "./pages/Ideas";
import Tasks from "./pages/Tasks";
import KnowledgeSearch from "./pages/KnowledgeSearch";
import Profile from "./pages/Profile";
import AdminUsers from "./pages/AdminUsers";
import MainLayout from "./components/Layout/MainLayout";
import AppRoutes from "./routes/routes"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppRoutes />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;