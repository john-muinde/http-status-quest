import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Code2, Gamepad2Icon, Book, Github } from "lucide-react";
import CurrentPlayer from "./ActivePlayers";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/play", label: "Play Game", icon: Gamepad2Icon },
    { path: "/status-codes", label: "Status Codes", icon: Code2 },
    { path: "/how-to-play", label: "How to Play", icon: Book },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <NavLink to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold text-blue-600"
              >
                HTTP Status Quest
              </motion.div>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </NavLink>
            ))}
            <CurrentPlayer />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 flex items-center space-x-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2
                ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </NavLink>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 flex items-center space-x-2"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </motion.div>
    </nav>
  );
};

export default NavBar;
