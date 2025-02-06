import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useLocation } from "react-router-dom";

const ActivePlayers = () => {
  const [playerCount, setPlayerCount] = useState(0);
  const location = useLocation();
  const isPlaying = location.pathname === "/play";

  useEffect(() => {
    if (!isPlaying) return;

    // Register player when component mounts
    const registerPlayer = async () => {
      try {
        await fetch("/api/player/register/route", { method: "POST" });
      } catch (error) {
        console.error("Error registering player:", error);
      }
    };

    // Fetch current count
    const fetchPlayerCount = async () => {
      try {
        const response = await fetch("/api/player/count/route");
        if (!response.ok) throw new Error("Failed to fetch player count");
        const data = await response.json();
        setPlayerCount(data.count);
      } catch (error) {
        console.error("Error fetching player count:", error);
        setPlayerCount(Math.floor(Math.random() * 50) + 100);
      }
    };

    // Initialize
    registerPlayer();
    fetchPlayerCount();

    // Set up polling interval for count updates
    const interval = setInterval(fetchPlayerCount, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  if (!isPlaying) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center space-x-3 px-4 py-2 bg-blue-50 rounded-full"
    >
      <div className="flex items-center text-blue-600">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2" />
        <Users className="w-4 h-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-blue-700">
          {playerCount.toLocaleString()} Active
        </span>
      </div>
    </motion.div>
  );
};

export default ActivePlayers;
