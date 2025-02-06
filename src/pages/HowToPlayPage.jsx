import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Gamepad2Icon,
  Heart,
  Timer,
  Star,
  Sparkles,
  HelpCircle,
  Shield,
  Trophy,
} from "lucide-react";

const HowToPlayPage = () => {
  const gameFeatures = [
    {
      icon: Shield,
      title: "Choose Your Difficulty",
      description:
        "Start with Normal mode to learn the basics, then progress to Hard and Expert modes for more challenging scenarios.",
    },
    {
      icon: Timer,
      title: "Beat the Clock",
      description:
        "You have 60 seconds per question. The faster you answer, the more points you earn!",
    },
    {
      icon: Heart,
      title: "Manage Your Lives",
      description:
        "You start with 3 lives. Each incorrect answer costs one life. Game over when you run out!",
    },
    {
      icon: Sparkles,
      title: "Build Combos",
      description:
        "Chain correct answers together to build your combo multiplier and earn bonus points.",
    },
    {
      icon: HelpCircle,
      title: "Use Hints Wisely",
      description:
        "Stuck on a question? Use a hint, but be careful - each hint costs 50 points!",
    },
    {
      icon: Trophy,
      title: "Aim for High Scores",
      description:
        "Challenge yourself to beat your highest score and longest combo streak.",
    },
  ];

  const Container = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {children}
    </motion.div>
  );

  return (
    <Container>
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          How to Play
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600"
        >
          Master HTTP status codes while having fun!
        </motion.p>
      </div>

      {/* Game Features */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {gameFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Tips */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-6">Quick Tips</h2>
        <ul className="space-y-4">
          <li className="flex items-start space-x-3">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              Learn the patterns: 2xx for success, 4xx for client errors, 5xx
              for server errors
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              Pay attention to the request details - method, headers, and
              context matter!
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              Use the search feature to quickly find the right status code
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              Start with common codes like 200, 201, 404, and 500 before moving
              to more specific ones
            </span>
          </li>
        </ul>
      </div>

      {/* Scoring System */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-6">Scoring System</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Base Points</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Normal Mode: 100 points</li>
              <li>Hard Mode: 150 points</li>
              <li>Expert Mode: 200 points</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bonus Points</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Speed Bonus: Up to 50 points</li>
              <li>Combo Multiplier: x1.5 for 3 in a row</li>
              <li>Perfect Round: 100 bonus points</li>
              <li>No Hints Used: 50 bonus points</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Difficulty Levels */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-xl shadow-md mb-12 text-white">
        <h2 className="text-2xl font-bold mb-6">Difficulty Levels</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-xl mb-4">Normal Mode</h3>
            <ul className="space-y-2 text-sm">
              <li>• Basic HTTP status codes</li>
              <li>• Common scenarios</li>
              <li>• 60-second timer</li>
              <li>• Unlimited hints</li>
            </ul>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-xl mb-4">Hard Mode</h3>
            <ul className="space-y-2 text-sm">
              <li>• Advanced status codes</li>
              <li>• Complex scenarios</li>
              <li>• 45-second timer</li>
              <li>• Limited hints</li>
            </ul>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-xl mb-4">Expert Mode</h3>
            <ul className="space-y-2 text-sm">
              <li>• All status codes</li>
              <li>• Real-world scenarios</li>
              <li>• 30-second timer</li>
              <li>• No hints available</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">
          Ready to Test Your Knowledge?
        </h2>
        <div className="flex justify-center space-x-4">
          <Link
            to="/play"
            className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Gamepad2Icon className="w-5 h-5" />
            <span>Start Playing</span>
          </Link>
          <Link
            to="/status-codes"
            className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <Shield className="w-5 h-5" />
            <span>Review Status Codes</span>
          </Link>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="mt-12 p-6 bg-yellow-50 border border-yellow-100 rounded-xl">
        <h3 className="font-semibold text-lg mb-4 flex items-center">
          <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
          Pro Tips
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            Use keyboard shortcuts: Numbers 1-5 for different categories, Enter
            to confirm
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            Study the patterns in status code numbers to make educated guesses
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            Review incorrect answers to improve your knowledge
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            Practice with different scenarios to understand real-world
            applications
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default HowToPlayPage;
