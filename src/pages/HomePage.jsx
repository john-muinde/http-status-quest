import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gamepad2Icon, Book, Code2, Trophy, Star } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Gamepad2Icon,
      title: 'Interactive Learning',
      description: 'Learn HTTP status codes through engaging gameplay and challenges'
    },
    {
      icon: Trophy,
      title: 'Track Progress',
      description: 'Earn points, build combos, and track your improvement over time'
    },
    {
      icon: Star,
      title: 'Multiple Difficulties',
      description: 'Progress from basic codes to expert-level scenarios'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center space-y-8 mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Master HTTP Status Codes
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Learn and memorize HTTP status codes through an engaging, interactive game.
          Perfect for developers, testers, and anyone working with web technologies.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center space-x-4"
        >
          <Link
            to="/play"
            className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Gamepad2Icon className="w-5 h-5" />
            <span>Start Playing</span>
          </Link>
          <Link
            to="/how-to-play"
            className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <Book className="w-5 h-5" />
            <span>How to Play</span>
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Status Codes Preview */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-8">Learn All Status Code Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['1xx', '2xx', '3xx', '4xx', '5xx'].map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="text-2xl font-bold text-blue-600 mb-2">{category}</div>
              <div className="text-sm text-gray-600">
                {
                  {
                    '1xx': 'Informational',
                    '2xx': 'Success',
                    '3xx': 'Redirection',
                    '4xx': 'Client Error',
                    '5xx': 'Server Error'
                  }[category]
                }
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Master HTTP Status Codes?</h2>
        <p className="text-xl mb-8">Start your journey to becoming an HTTP expert today!</p>
        <Link
          to="/play"
          className="px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
        >
          <Gamepad2Icon className="w-5 h-5" />
          <span>Play Now</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;