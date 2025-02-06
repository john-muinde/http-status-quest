import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Info, ExternalLink, Book } from "lucide-react";
import { statusCategories } from "../data/gameData";
import QuickReference from "../components/QuickReference";

const StatusCodesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedCode, setExpandedCode] = useState(null);

  // Extended information about status codes
  const codeDescriptions = {
    200: {
      description:
        "The request succeeded. The result meaning of 'success' depends on the HTTP method.",
      example: "GET /api/users -> Returns user list successfully",
      common: true,
    },
    404: {
      description:
        "The server cannot find the requested resource. One of the most common HTTP errors.",
      example: "GET /api/missing-page -> Page not found",
      common: true,
    },
    // Add more detailed descriptions as needed
  };

  const filterStatusCodes = () => {
    const searchLower = searchTerm.toLowerCase();
    let filteredCodes = { ...statusCategories };

    // Filter by category
    if (selectedCategory !== "all") {
      const categoryPrefix = selectedCategory.slice(0, 1);
      filteredCodes = Object.entries(statusCategories).reduce(
        (acc, [category, codes]) => {
          if (category.startsWith(categoryPrefix)) {
            acc[category] = codes;
          }
          return acc;
        },
        {}
      );
    }

    // Filter by search term
    if (searchTerm) {
      filteredCodes = Object.entries(filteredCodes).reduce(
        (acc, [category, codes]) => {
          const filtered = codes.filter(
            (code) =>
              code.code.toString().includes(searchLower) ||
              code.name.toLowerCase().includes(searchLower)
          );
          if (filtered.length > 0) {
            acc[category] = filtered;
          }
          return acc;
        },
        {}
      );
    }

    return filteredCodes;
  };

  const getCategoryColor = (category) => {
    const colors = {
      "1xx": "bg-purple-100 text-purple-800",
      "2xx": "bg-green-100 text-green-800",
      "3xx": "bg-blue-100 text-blue-800",
      "4xx": "bg-yellow-100 text-yellow-800",
      "5xx": "bg-red-100 text-red-800",
    };
    const prefix = category.substring(0, 3);
    return colors[prefix] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          HTTP Status Codes Reference
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600"
        >
          A comprehensive guide to HTTP status codes and their meanings
        </motion.p>
      </div>

      {/* Quick Reference Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Common Status Codes</h2>
        <QuickReference />
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search status codes... (e.g., 404 or Not Found)"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["all", "1xx", "2xx", "3xx", "4xx", "5xx"].map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  category === "all" ? "all" : `${category} Informational`
                )
              }
              className={`px-4 py-2 rounded-lg font-medium transition-colors
                ${
                  selectedCategory ===
                  (category === "all" ? "all" : `${category} Informational`)
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {category === "all" ? "All" : `${category}`}
            </button>
          ))}
        </div>
      </div>

      {/* Status Codes Grid */}
      <div className="space-y-8">
        {Object.entries(filterStatusCodes()).map(([category, codes]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className={`px-6 py-4 ${getCategoryColor(category)}`}>
              <h2 className="text-xl font-bold">{category}</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {codes.map((status) => (
                  <motion.div
                    key={status.code}
                    layoutId={`status-${status.code}`}
                    onClick={() =>
                      setExpandedCode(
                        expandedCode === status.code ? null : status.code
                      )
                    }
                    className={`p-4 rounded-lg border cursor-pointer transition-all
                      ${
                        expandedCode === status.code
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-2xl font-mono font-bold">
                          {status.code}
                        </div>
                        <div className="text-gray-600">{status.name}</div>
                      </div>
                      <Info
                        className={`w-5 h-5 ${
                          expandedCode === status.code
                            ? "text-blue-500"
                            : "text-gray-400"
                        }`}
                      />
                    </div>

                    {expandedCode === status.code &&
                      codeDescriptions[status.code] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pt-4 border-t border-gray-200 space-y-2"
                        >
                          <p className="text-sm text-gray-600">
                            {codeDescriptions[status.code].description}
                          </p>
                          <div className="text-sm text-gray-600">
                            <strong>Example:</strong>{" "}
                            {codeDescriptions[status.code].example}
                          </div>
                          {codeDescriptions[status.code].common && (
                            <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              Commonly Used
                            </div>
                          )}
                        </motion.div>
                      )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resources Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-6 bg-gray-50 rounded-xl"
      >
        <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
        <div className="space-y-2">
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <Book className="w-4 h-4" />
            <span>MDN Web Docs - HTTP Status Codes</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          {/* Add more resources */}
        </div>
      </motion.div>
    </div>
  );
};

export default StatusCodesPage;
