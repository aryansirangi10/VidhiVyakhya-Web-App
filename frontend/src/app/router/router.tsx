import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";

const LandingPage = lazy(() => import("../../pages/LandingPage"));

function LazyPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">VidhiVyakhya 2.0 Module</p>
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/bills" element={<LazyPage title="Bill Explorer" />} />
        <Route path="/dashboard" element={<LazyPage title="Dashboard" />} />
        <Route path="/profile" element={<LazyPage title="User Profile" />} />
        <Route path="/calculator" element={<LazyPage title="Impact Calculator" />} />
        <Route path="/history" element={<LazyPage title="Calculation History" />} />
        <Route path="/settings" element={<LazyPage title="Settings" />} />
        <Route path="*" element={<LazyPage title="404 — Page Not Found" />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
