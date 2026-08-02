import React from "react";
import Spinner from "../Spinner";

export function LoadingState({ label = "Loading statutory intelligence..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-3 font-mono">
      <Spinner size="lg" />
      <span className="text-xs font-bold text-slate-500">{label}</span>
    </div>
  );
}

export default LoadingState;
