import React from 'react';
import { ConnectionCardContent } from './ConnectionCardContent';
import { motion } from 'framer-motion';
import { AnimationConfig } from '../../types/types';

interface ConnectionCardProps {
  number: number;
  title: string;
  description: string;
  isEndpoint: boolean;
  animationConfig?: AnimationConfig;
  index?: number;
}

export const ConnectionCard: React.FC<ConnectionCardProps> = ({
  number,
  title,
  description,
  isEndpoint,
  animationConfig,
  index = 0,
}) => {
  return (
    <motion.div
      initial={animationConfig?.initial}
      animate={animationConfig?.animate}
      transition={{
        ...animationConfig?.transition,
        delay: (animationConfig?.transition.delay || 0) + index * 0.1,
      }}
      className={`
        relative p-4 rounded-xl
        ${isEndpoint 
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
          : 'bg-gray-900 text-white'
        }
        transform transition-all duration-300
        hover:scale-102
        shadow-lg hover:shadow-xl
        border border-gray-800
        group
      `}
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <div className="absolute transform rotate-45 w-full h-full bg-white" />
      </div>

      {/* Vertical Line Under Number (if number < 6) */}
      {number < 6 && (
        <div className="absolute left-8 -bottom-6 w-0.5 h-6 bg-purple-500" />
      )}
      
      {/* Card Content */}
      <ConnectionCardContent 
        number={number} 
        title={title} 
        description={description} 
        isEndpoint={isEndpoint} 
      />
    </motion.div>
  );
};