import React, { createContext, useContext, useState, ReactNode } from "react";
import { ActiveClause } from "../types/rule";

export interface ActiveClauseContextType {
  activeClause: ActiveClause | null;
  setActiveClause: (clause: ActiveClause | null) => void;
  jumpToClause: (
    ruleId: string,
    page: number,
    clauseId: string,
    paragraph: number,
    summary: string,
    confidence: number
  ) => void;
}

const ActiveClauseContext = createContext<ActiveClauseContextType | undefined>(undefined);

export function ActiveClauseProvider({ children }: { children: ReactNode }) {
  const [activeClause, setActiveClause] = useState<ActiveClause | null>({
    ruleId: "r-17",
    clauseId: "Clause 4",
    page: 14,
    paragraph: 2,
    confidence: 0.98,
    summary: "Standard deduction increased from ₹50,000 to ₹75,000.",
  });

  const jumpToClause = (
    ruleId: string,
    page: number,
    clauseId: string,
    paragraph: number,
    summary: string,
    confidence: number
  ) => {
    setActiveClause({
      ruleId,
      page,
      clauseId,
      paragraph,
      summary,
      confidence,
    });
  };

  return (
    <ActiveClauseContext.Provider value={{ activeClause, setActiveClause, jumpToClause }}>
      {children}
    </ActiveClauseContext.Provider>
  );
}

export function useActiveClauseContext() {
  const context = useContext(ActiveClauseContext);
  if (!context) {
    throw new Error("useActiveClauseContext must be used within an ActiveClauseProvider");
  }
  return context;
}
