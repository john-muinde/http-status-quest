// GameLevel.js
import React from "react";
import { motion } from "framer-motion";
import { difficultyColors, methodColors } from "../data/gameData";

const GameLevel = ({ level, onAnswer }) => {
  const containerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-white rounded-xl shadow-lg p-6 space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <h2 className="text-2xl font-bold">{level.title}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            difficultyColors[level.difficulty]
          }`}
        >
          {level.difficulty}
        </span>
      </motion.div>

      <motion.p variants={itemVariants} className="text-gray-600">
        {level.description}
      </motion.p>

      <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <span
            className={`px-3 py-1 rounded-md ${methodColors[level.method]}`}
          >
            {level.method}
          </span>
          <code className="flex-1 font-mono bg-gray-100 p-2 rounded">
            {level.endpoint}
          </code>
        </div>

        {level.headers && (
          <div className="mt-4 space-y-2">
            <div className="text-sm text-gray-500">Headers:</div>
            {Object.entries(level.headers).map(([key, value]) => (
              <div key={key} className="font-mono text-sm">
                {key}: {value === null ? "<missing>" : value}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div className="text-sm text-gray-500">
          Bonus points available: {level.bonusPoints}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameLevel;
