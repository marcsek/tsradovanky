const transition = { type: "spring", stiffness: 300, damping: 23, mass: 1 };

export const backgroundAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, pointerEvents: "none" },

  transition,
};

export const windowAnimation = {
  initial: { y: "-100vh", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  exit: { y: "-100vh", opacity: 0 },

  transition,
};

export const cBallScaleVariant = {
  scaleUp: (isSelected: boolean) => ({
    scale: isSelected ? 1.5 : 0.9,
    transition: { type: "spring", stiffness: 350 },
  }),
};
