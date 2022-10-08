const transition = { type: "spring", stiffness: 300, damping: 23, mass: 1 };

export const elementAnimation = (isPresent: boolean, safeToRemove: any) => {
  return {
    initial: "out",
    animate: isPresent ? "in" : "out",

    variants: {
      in: { scale: 1, opacity: 1 },
      out: { scale: 0, opacity: 0, zIndex: 0 },
    },

    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition,
  };
};
