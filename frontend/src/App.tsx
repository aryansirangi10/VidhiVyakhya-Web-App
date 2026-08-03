import React from "react";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import AppRouter from "./app/router/router";

export default function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}
