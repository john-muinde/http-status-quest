import React from "react";
import { motion } from "framer-motion";
import { Gamepad2Icon, Star } from "lucide-react";
import { useLocation } from "react-router-dom";

const CurrentPlayer = () => {
  const location = useLocation();
  const isPlaying = location.pathname === "/play";

  if (!isPlaying) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center space-x-3 px-4 py-2 bg-green-50 rounded-full"
    >
      <div className="flex items-center text-green-600">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
        <Gamepad2Icon className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium text-green-700">
        Currently Playing
      </span>
    </motion.div>
  );
};

export default CurrentPlayer;
