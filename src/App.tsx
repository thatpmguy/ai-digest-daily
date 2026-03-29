import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Verify from "./pages/Verify";
import OnboardingInterests from "./pages/OnboardingInterests";
import OnboardingLevel from "./pages/OnboardingLevel";
import OnboardingAssess from "./pages/OnboardingAssess";
import OnboardingDone from "./pages/OnboardingDone";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import DigestView from "./pages/DigestView";
import Quiz from "./pages/Quiz";
import ReadingList from "./pages/ReadingList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/verify" element={<Verify />} />
            <Route
              path="/onboarding/interests"
              element={<ProtectedRoute><OnboardingInterests /></ProtectedRoute>}
            />
            <Route
              path="/onboarding/level"
              element={<ProtectedRoute><OnboardingLevel /></ProtectedRoute>}
            />
            <Route
              path="/onboarding/assess"
              element={<ProtectedRoute><OnboardingAssess /></ProtectedRoute>}
            />
            <Route
              path="/onboarding/done"
              element={<ProtectedRoute><OnboardingDone /></ProtectedRoute>}
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
            >
              <Route index element={<DashboardHome />} />
              <Route path="digest/:id" element={<DigestView />} />
              <Route path="quiz/:id" element={<Quiz />} />
              <Route path="reading-list" element={<ReadingList />} />
              <Route path="settings" element={<div className="text-muted-foreground">Settings coming soon</div>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
