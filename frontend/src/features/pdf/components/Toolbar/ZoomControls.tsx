import React from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import Button from "../../../../components/ui/Button";
import Select from "../../../../components/ui/Select";
import { useZoom } from "../../hooks/useZoom";

export function ZoomControls() {
  const { zoom, setZoom, zoomIn, zoomOut } = useZoom();

  const options = [
    { label: "50%", value: "0.5" },
    { label: "75%", value: "0.75" },
    { label: "100%", value: "1.0" },
    { label: "125%", value: "1.25" },
    { label: "150%", value: "1.5" },
    { label: "200%", value: "2.0" },
    { label: "300%", value: "3.0" },
  ];

  return (
    <div className="flex items-center gap-1">
      <Button size="xs" variant="ghost" onClick={zoomOut} disabled={zoom <= 0.5}>
        <ZoomOut size={16} />
      </Button>

      <Select
        size="sm"
        options={options}
        value={zoom.toString()}
        onChange={(e) => setZoom(parseFloat(e.target.value))}
        className="w-24 font-mono font-bold text-xs"
      />

      <Button size="xs" variant="ghost" onClick={zoomIn} disabled={zoom >= 3.0}>
        <ZoomIn size={16} />
      </Button>
    </div>
  );
}

export default ZoomControls;
