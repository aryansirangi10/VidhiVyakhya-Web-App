import React, { Suspense, lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import CommandPalette from "../../components/layout/CommandPalette";
import { ToastProvider } from "../providers/ToastContext";

const LandingPage = lazy(() => import("../../pages/LandingPage"));
const BillsPage = lazy(() => import("../../features/bills/pages/BillsPage"));
const BillDetailPage = lazy(() => import("../../features/bills/pages/BillDetailPage"));
const CalculatorPage = lazy(() => import("../../features/calculator/components/CalculatorPage"));
const DashboardPage = lazy(() => import("../../features/dashboard/components/DashboardPage"));
const AssistantPanel = lazy(() => import("../../features/assistant/components/AssistantPanel"));
const OnboardingPage = lazy(() => import("../../features/auth/pages/OnboardingPage"));
const SettingsPage = lazy(() => import("../../features/auth/pages/SettingsPage"));
const IntelligenceHome = lazy(() => import("../../features/intelligence/pages/IntelligenceHome"));
const CompareBillsPage = lazy(() => import("../../features/intelligence/pages/CompareBillsPage"));
const LoginForm = lazy(() => import("../../features/auth/components/LoginForm/LoginForm"));
const RegisterForm = lazy(() => import("../../features/auth/components/RegisterForm/RegisterForm"));

export function AppRouter() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN WORKSPACE AREA */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <Topbar onOpenCommand={() => setCommandOpen(true)} />

          <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            <Suspense
              fallback={
                <div className="flex h-96 w-full items-center justify-center">
                  <Spinner size="lg" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/bills" element={<BillsPage />} />
                <Route path="/bills/:id" element={<BillDetailPage />} />
                <Route path="/intelligence" element={<IntelligenceHome />} />
                <Route path="/documents" element={<IntelligenceHome />} />
                <Route path="/compare" element={<CompareBillsPage />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/assistant" element={<AssistantPanel />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route
                  path="/login"
                  element={
                    <div className="py-16 px-4">
                      <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 text-center font-mono">Sign In to Workspace</h2>
                        <LoginForm />
                      </div>
                    </div>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <div className="py-16 px-4">
                      <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 text-center font-mono">Create Free Account</h2>
                        <RegisterForm />
                      </div>
                    </div>
                  }
                />
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>

        {/* GLOBAL COMMAND PALETTE OVERLAY */}
        <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
      </div>
    </ToastProvider>
  );
}

export default AppRouter;
