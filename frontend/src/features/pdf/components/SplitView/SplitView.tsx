import React, { useState, useEffect } from "react";
import PDFViewer from "../PDFViewer/PDFViewer";
import RulePanel from "../RulePanel/RulePanel";
import StickyNavigator from "../Navigation/StickyNavigator";
import ActiveClauseIndicator from "../Highlight/ActiveClauseIndicator";
import { ActiveClauseProvider } from "../../context/ActiveClauseContext";

export interface SplitViewProps {
  pdfUrl?: string;
}

function InnerSplitView({ pdfUrl = "/documents/finance_bill_2024.pdf" }: SplitViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Income Tax");
  const [splitRatio, setSplitRatio] = useState<number>(55); // 55% PDF, 45% Rules

  useEffect(() => {
    const savedRatio = localStorage.getItem("vidhivyakhya_split_ratio");
    if (savedRatio) {
      setSplitRatio(parseFloat(savedRatio));
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full min-h-screen bg-slate-100 p-4">
      <ActiveClauseIndicator />

      {/* DUAL PANE CONTAINER */}
      <div className="flex flex-col lg:flex-row gap-6 w-full flex-1">
        {/* LEFT PANE: PDF VIEWER */}
        <div
          className="w-full shrink-0 flex flex-col transition-all duration-150"
          style={{ flex: `${splitRatio} 1 0%` }}
        >
          <PDFViewer url={pdfUrl} />
        </div>

        {/* RIGHT PANE: RULE INTELLIGENCE PANEL */}
        <div
          className="w-full flex-1 flex flex-col md:flex-row gap-4 overflow-auto rounded-3xl bg-white p-6 border border-slate-200 shadow-sm"
        >
          <StickyNavigator
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="flex-1 overflow-auto">
            <RulePanel selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SplitView(props: SplitViewProps) {
  return (
    <ActiveClauseProvider>
      <InnerSplitView {...props} />
    </ActiveClauseProvider>
  );
}

export default SplitView;
