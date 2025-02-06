import React from "react";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, ShieldOff } from "lucide-react";

const DifficultySelector = ({ selectedDifficulty, onSelect }) => {
  const difficulties = [
    {
      id: "normal",
      name: "Normal",
      icon: Shield,
      color: "text-green-500",
      description: "Learn the basic HTTP status codes",
    },
    {
      id: "hard",
      name: "Hard",
      icon: ShieldAlert,
      color: "text-yellow-500",
      description: "Complex scenarios and edge cases",
    },
    {
      id: "expert",
      name: "Expert",
      icon: ShieldOff,
      color: "text-red-500",
      description: "Real-world distributed systems challenges",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {difficulties.map((difficulty) => {
        const Icon = difficulty.icon;
        const isSelected = selectedDifficulty === difficulty.id;

        return (
          <motion.button
            key={difficulty.id}
            onClick={() => onSelect(difficulty.id)}
            className={`p-6 rounded-lg border-2 transition-colors cursor-pointer ${
              isSelected
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon className={`w-8 h-8 ${difficulty.color} mx-auto mb-4`} />
            <h3 className="text-lg font-semibold mb-2">{difficulty.name}</h3>
            <p className="text-sm text-gray-600">{difficulty.description}</p>
          </motion.button>
        );
      })}
    </div>
  );
};

export default DifficultySelector;
