import React, { useState, useEffect, useRef, memo } from "react";
import { motion, useAnimation } from "framer-motion";
import { Timer } from "lucide-react";

const GameTimer = memo(({ initialTime, onTimeUp, isPlaying }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const intervalRef = useRef(null);
  const controls = useAnimation();

  // Reset timer whenever isPlaying changes or component mounts
  useEffect(() => {
    setTimeRemaining(initialTime);
    
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isPlaying, initialTime, onTimeUp]);

  useEffect(() => {
    if (timeRemaining <= 10) {
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.5, repeat: Infinity },
      });
    } else {
      controls.stop();
      controls.set({ scale: 1 });
    }
  }, [timeRemaining <= 10, controls]);

  const getProgressColor = () => {
    const percentage = (timeRemaining / initialTime) * 100;
    if (percentage <= 25) return "bg-red-500";
    if (percentage <= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <div className="relative w-full bg-white rounded-xl shadow-sm px-4 py-3">
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <motion.div
          className={`h-full ${getProgressColor()} opacity-10`}
          initial={{ width: "100%" }}
          animate={{ width: `${(timeRemaining / initialTime) * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <motion.div
        className="relative flex items-center justify-between"
        animate={controls}
      >
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Time</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-2xl font-bold ${
              timeRemaining <= 10 ? "text-red-500" : "text-gray-700"
            }`}
          >
            {timeRemaining}
          </span>
        </div>
      </motion.div>
    </div>
  );
});

GameTimer.displayName = "GameTimer";

export default GameTimer;