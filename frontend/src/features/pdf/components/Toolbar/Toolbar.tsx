import React from "react";
import { Maximize2, Minimize2, Printer } from "lucide-react";
import Button from "../../../../components/ui/Button";
import PageNavigator from "./PageNavigator";
import ZoomControls from "./ZoomControls";
import RotateButton from "./RotateButton";
import DownloadButton from "./DownloadButton";
import { usePDFContext } from "../../context/PDFContext";

export function Toolbar() {
  const { isFullscreen, toggleFullscreen } = usePDFContext();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-3 border border-slate-200 shadow-sm text-slate-700">
      {/* LEFT: PAGE NAVIGATOR */}
      <PageNavigator />

      {/* CENTER: ZOOM CONTROLS */}
      <ZoomControls />

      {/* RIGHT: ACTIONS */}
      <div className="flex items-center gap-2">
        <RotateButton />
        <Button size="xs" variant="ghost" onClick={handlePrint} title="Print PDF">
          <Printer size={16} />
        </Button>
        <Button size="xs" variant="ghost" onClick={toggleFullscreen} title="Toggle Fullscreen">
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </Button>
        <DownloadButton />
      </div>
    </div>
  );
}

export default Toolbar;
