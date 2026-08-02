import React from "react";
import { Download } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { usePDF } from "../../hooks/usePDF";

export function DownloadButton() {
  const { document } = usePDF();

  const handleDownload = () => {
    if (!document) return;
    const a = window.document.createElement("a");
    a.href = document.url;
    a.download = `${document.title}.pdf`;
    a.click();
  };

  return (
    <Button size="xs" variant="outline" leftIcon={<Download size={14} />} onClick={handleDownload}>
      Download
    </Button>
  );
}

export default DownloadButton;
