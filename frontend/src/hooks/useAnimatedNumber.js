import { useState, useEffect, useRef } from 'react';

/**
 * useAnimatedNumber - Smoothly animates a number over 800ms at 60 FPS
 * @param {number} targetValue - The final numeric target
 */
export function useAnimatedNumber(targetValue) {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const startValRef = useRef(targetValue);
  const targetValRef = useRef(targetValue);
  const startTimeRef = useRef(null);
  
  useEffect(() => {
    targetValRef.current = targetValue;
    startValRef.current = displayValue;
    startTimeRef.current = null;
    
    let animationFrameId;
    
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      
      const elapsed = timestamp - startTimeRef.current;
      const duration = 800; // 800ms ease out duration
      
      if (elapsed >= duration) {
        setDisplayValue(targetValRef.current);
        return;
      }
      
      // Easing function: Cubic ease out
      const progress = elapsed / duration;
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const currentVal = Math.round(
        startValRef.current + (targetValRef.current - startValRef.current) * easeOutCubic
      );
      
      setDisplayValue(currentVal);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue]);

  return displayValue;
}

export default useAnimatedNumber;
