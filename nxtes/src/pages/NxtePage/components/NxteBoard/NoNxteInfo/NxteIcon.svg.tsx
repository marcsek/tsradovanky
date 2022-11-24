import React from "react";
import { motion } from "framer-motion";

const NxteIcon: React.FC<{ forCol: string; bckCol: string }> = ({ forCol, bckCol }) => {
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" width="102" height="102" fill="none" viewBox="0 0 112 112">
      <motion.path
        initial={{ rotate: -40, x: -20 }}
        animate={{ rotate: 0, x: 0 }}
        exit={{ opacity: -1.5 }}
        transition={{ type: "spring", stiffness: 180 }}
        stroke={forCol}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
        d="M58.987 39.807l22.633 5.74m-27.207 12.32l13.534 3.453m2.333 29.167c-2.893 1.96-6.533 3.593-10.967 5.04l-7.373 2.427c-18.527 5.973-28.28.98-34.3-17.547l-5.974-18.433c-5.973-18.527-1.026-28.327 17.5-34.3l7.374-2.427c1.913-.607 3.733-1.12 5.46-1.447-1.4 2.847-2.52 6.3-3.453 10.267L33.973 53.62C29.4 73.127 35.42 82.74 54.88 87.36l7.84 1.867c2.707.653 5.227 1.073 7.56 1.26v0z"
      ></motion.path>
      <motion.path
        exit={{ opacity: -1.5 }}
        stroke={bckCol}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
        d="M101.08 48.72l-4.573 19.507c-3.92 16.846-11.667 23.66-26.227 22.26-2.333-.187-4.853-.607-7.56-1.26l-7.84-1.867C35.42 82.74 29.4 73.127 33.973 53.62l4.574-19.553C39.48 30.1 40.6 26.647 42 23.8c5.46-11.293 14.747-14.327 30.333-10.64l7.794 1.82c19.553 4.573 25.526 14.233 20.953 33.74v0z"
      ></motion.path>
    </motion.svg>
  );
};

export default NxteIcon;
