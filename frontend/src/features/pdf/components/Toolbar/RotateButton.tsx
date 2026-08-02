import React from "react";
import { RotateCw } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { useRotation } from "../../hooks/useRotation";

export function RotateButton() {
  const { rotate } = useRotation();
  return (
    <Button size="xs" variant="ghost" onClick={rotate} title="Rotate PDF">
      <RotateCw size={16} />
    </Button>
  );
}

export default RotateButton;
