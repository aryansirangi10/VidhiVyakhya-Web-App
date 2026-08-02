import React from 'react';
import { useAnimatedNumber } from '../../hooks/useAnimatedNumber';

export function AnimatedImpact({ value, className = '' }) {
  const animatedValue = useAnimatedNumber(value);
  
  const isSavings = value >= 0;
  const absValue = Math.abs(animatedValue);
  const colorClass = isSavings ? "text-savings" : "text-cost";

  return (
    <span className={`font-bold font-mono ${colorClass} ${className}`}>
      {isSavings ? '+' : '-'}₹{absValue.toLocaleString('en-IN')}
    </span>
  );
}

export default AnimatedImpact;
