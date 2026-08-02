export const motion = {
  transition: {
    fast: { duration: 0.15, ease: "easeOut" },
    normal: { duration: 0.25, ease: "easeInOut" },
    slow: { duration: 0.4, ease: "easeInOut" },
    spring: { type: "spring", stiffness: 300, damping: 25 },
    bounce: { type: "spring", stiffness: 400, damping: 15 },
  },
  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 10 },
    },
    scaleUp: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
  },
} as const;

export default motion;
