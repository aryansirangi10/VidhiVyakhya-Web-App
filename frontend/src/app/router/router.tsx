import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import Navbar from "../../components/layout/Navbar";

const LandingPage = lazy(() => import("../../pages/LandingPage"));
const BillsPage = lazy(() => import("../../features/bills/pages/BillsPage"));
const BillDetailPage = lazy(() => import("../../features/bills/pages/BillDetailPage"));
const CalculatorPage = lazy(() => import("../../features/calculator/components/CalculatorPage"));
const DashboardPage = lazy(() => import("../../features/dashboard/components/DashboardPage"));
const AssistantPanel = lazy(() => import("../../features/assistant/components/AssistantPanel"));
const LoginForm = lazy(() => import("../../features/auth/components/LoginForm/LoginForm"));
const RegisterForm = lazy(() => import("../../features/auth/components/RegisterForm/RegisterForm"));

export function AppRouter() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
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
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
              path="/assistant"
              element={
                <div className="py-8 px-4">
                  <AssistantPanel />
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <div className="py-16 px-4">
                  <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 text-center">Sign In</h2>
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
                    <h2 className="text-2xl font-bold text-slate-900 text-center">Create Free Account</h2>
                    <RegisterForm />
                  </div>
                </div>
              }
            />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default AppRouter;
