export const pulseVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: [0.4, 0.9, 0.6],
    scale: [0.98, 1.02, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};
