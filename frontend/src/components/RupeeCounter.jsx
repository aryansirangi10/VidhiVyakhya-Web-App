import React, { useEffect, useState } from "react";

export default function RupeeCounter({ value, className }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 800; // 800ms duration
    const startValue = 0;
    const endValue = value;

    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuad curve
      const easedProgress = progress * (2 - progress);
      const current = Math.round(startValue + easedProgress * (endValue - startValue));
      
      setCount(current);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value]);

  const prefix = count > 0 ? "+" : count < 0 ? "-" : "";
  const absValue = Math.abs(count);
  const formattedNumber = absValue.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

  return (
    <span className={className}>
      {prefix}₹{formattedNumber}
    </span>
  );
}
