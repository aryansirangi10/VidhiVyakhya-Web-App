import React, { useState } from "react";
import { motion } from "framer-motion";
import HighlightTooltip from "./HighlightTooltip";
import { ScaledRect } from "../utils/pdfCoordinates";

export interface HighlightBoxProps {
  rect: ScaledRect;
  clauseId: string;
  confidence?: number;
  isPrimary?: boolean;
}

export function HighlightBox({ rect, clauseId, confidence = 0.98, isPrimary = true }: HighlightBoxProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute z-20 pointer-events-auto"
      style={{
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className={`w-full h-full rounded-lg border-2 transition-all ${
          isPrimary
            ? "border-amber-400 bg-amber-400/25 ring-4 ring-amber-400/20 shadow-lg"
            : "border-brand-400 bg-brand-400/15"
        }`}
      />

      {hovered && (
        <HighlightTooltip
          data={{
            clauseId,
            section: "Statutory Section",
            page: 14,
            paragraph: 2,
            confidence,
            isVerified: true,
          }}
        />
      )}
    </div>
  );
}

export default HighlightBox;
