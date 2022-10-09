const transition = { type: "spring", stiffness: 300, damping: 10 };

export const inputListAnimation = {
  initial: "init",
  animate: "show",
  exit: "ex",

  variants: {
    init: {
      scale: 0.4,
      transition,
    },
    show: {
      scale: 1,
      transition,
    },
    ex: {
      scale: 0,
      opacity: 0,
      transition: {
        default: { type: "spring", velocity: 10, damping: 8 },
      },
    },
  },
};
