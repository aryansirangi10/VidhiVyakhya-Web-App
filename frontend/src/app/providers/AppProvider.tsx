import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

export interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="light">
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default AppProvider;
