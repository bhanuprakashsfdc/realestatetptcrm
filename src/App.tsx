
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PropertiesList from "./pages/PropertiesList";
import Properties from "./pages/Properties";
import LeadsList from "./pages/LeadsList";
import Leads from "./pages/Leads";
import ProjectsList from "./pages/ProjectsList";
import Projects from "./pages/Projects";
import ContactsList from "./pages/ContactsList";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<PropertiesList />} />
          <Route path="/properties/:id" element={<Properties />} />
          <Route path="/leads" element={<LeadsList />} />
          <Route path="/leads/:id" element={<Leads />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/:id" element={<Projects />} />
          <Route path="/contacts" element={<ContactsList />} />
          <Route path="/contacts/:id" element={<Contacts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
