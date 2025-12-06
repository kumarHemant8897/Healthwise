import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import SymptomChecker from "./pages/SymptomChecker";
import HealthLibrary from "./pages/HealthLibrary";
import Article from "./pages/Article";
import About from "./pages/About";
import MedicalDisclaimer from "./pages/MedicalDisclaimer";
import MedicalReportAnalysis from "./pages/MedicalReportAnalysis";
import SearchResults from "./pages/SearchResults";
import ShareExperience from "./pages/ShareExperience";
import Experiences from "./pages/Experiences";
import ExperienceDetail from "./pages/ExperienceDetail";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/health-library" element={<HealthLibrary />} />
            <Route path="/report-analysis" element={<MedicalReportAnalysis />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/share-experience" element={<ShareExperience />} />
            <Route path="/experience/:slug" element={<ExperienceDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/about" element={<About />} />
            <Route path="/medical-disclaimer" element={<MedicalDisclaimer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
