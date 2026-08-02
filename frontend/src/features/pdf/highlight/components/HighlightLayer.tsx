import React from "react";
import HighlightBox from "./HighlightBox";
import { useActiveClause } from "../../hooks/useActiveClause";
import { useZoom } from "../../hooks/useZoom";
import { usePage } from "../../hooks/usePage";

export function HighlightLayer() {
  const { activeClause } = useActiveClause();
  const { zoom } = useZoom();
  const { currentPage } = usePage();

  if (!activeClause || activeClause.page !== currentPage) return null;

  // Compute bounding box coordinates for active clause
  const scaledRect = {
    left: 140 * zoom,
    top: 220 * zoom,
    width: 320 * zoom,
    height: 90 * zoom,
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <HighlightBox
        rect={scaledRect}
        clauseId={activeClause.clauseId}
        confidence={activeClause.confidence}
        isPrimary={true}
      />
    </div>
  );
}

export default HighlightLayer;
