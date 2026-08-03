import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";
import Button from "../ui/Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 p-6 font-mono text-white">
          <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-rose-950 text-rose-500 flex items-center justify-center mx-auto border border-rose-800">
              <AlertOctagon size={28} />
            </div>
            <h2 className="text-lg font-bold text-white">Application Exception Intercepted</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {this.state.error?.message || "An unexpected error occurred in the workspace engine."}
            </p>
            <Button
              size="sm"
              onClick={() => this.setState({ hasError: false, error: null })}
              rightIcon={<RefreshCw size={14} />}
            >
              Reset Workspace State
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
