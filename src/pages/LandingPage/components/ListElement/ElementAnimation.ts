const transition = { type: "spring", stiffness: 300, damping: 23, mass: 1 };

export const elementAnimation = {
  initial: "out",
  animate: "in",
  exit: "out",

  variants: {
    in: { scale: 1, opacity: 1, transition },
    out: { scale: 0, opacity: 0, zIndex: 0 },
  },

  whileHover: {
    scale: 1.07,
    transition: { type: "spring", stiffness: 800, damping: 20, mass: 2 },
  },

  transition,
};
