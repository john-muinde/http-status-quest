import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from './Tooltip';

const commonStatusCodes = [
  {
    code: 200,
    name: 'OK',
    description: 'Request succeeded. Most common success status.',
    category: 'success',
    example: 'GET /api/users → Success'
  },
  {
    code: 201,
    name: 'Created',
    description: 'Request succeeded and new resource created.',
    category: 'success',
    example: 'POST /api/users → New user created'
  },
  {
    code: 400,
    name: 'Bad Request',
    description: 'Server cannot process request due to client error.',
    category: 'error',
    example: 'POST /api/users (invalid data)'
  },
  {
    code: 401,
    name: 'Unauthorized',
    description: 'Authentication required for resource access.',
    category: 'error',
    example: 'GET /api/admin without token'
  },
  {
    code: 403,
    name: 'Forbidden',
    description: 'Server understands but refuses to authorize.',
    category: 'error',
    example: 'GET /api/admin as normal user'
  },
  {
    code: 404,
    name: 'Not Found',
    description: 'Server cannot find the requested resource.',
    category: 'error',
    example: 'GET /api/users/999 (non-existent)'
  },
  {
    code: 500,
    name: 'Internal Server Error',
    description: 'Server encountered an unexpected condition.',
    category: 'error',
    example: 'Any request → Server crashes'
  },
  {
    code: 503,
    name: 'Service Unavailable',
    description: 'Server temporarily unable to handle request.',
    category: 'error',
    example: 'Any request during maintenance'
  }
];

const QuickReference = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const getCategoryColor = (category) => {
    return category === 'success' 
      ? 'bg-green-50 border-green-200 hover:border-green-300'
      : 'bg-red-50 border-red-200 hover:border-red-300';
  };

  const getCodeColor = (category) => {
    return category === 'success' 
      ? 'text-green-700 bg-green-100'
      : 'text-red-700 bg-red-100';
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {commonStatusCodes.map((status) => (
        <Tooltip
          key={status.code}
          content={
            <div className="p-2 max-w-xs">
              <div className="font-mono mb-1">{status.example}</div>
              <div className="text-sm text-gray-200">{status.description}</div>
            </div>
          }
        >
          <motion.div
            variants={item}
            className={`p-4 rounded-lg border-2 ${getCategoryColor(status.category)} 
              transition-colors cursor-help`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`px-2 py-1 rounded font-mono font-bold ${getCodeColor(status.category)}`}>
                {status.code}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {status.category === 'success' ? 'Success' : 'Error'}
              </span>
            </div>
            <h3 className="font-semibold">{status.name}</h3>
          </motion.div>
        </Tooltip>
      ))}
    </motion.div>
  );
};

export default QuickReference;