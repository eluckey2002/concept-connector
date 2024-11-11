// components/ConnectionCard.tsx
import React from 'react';

interface ConnectionCardProps {
  number: number;
  title: string;
  description: string;
  isEndpoint: boolean;
}

export const ConnectionCard: React.FC<ConnectionCardProps> = ({ 
  number, 
  title, 
  description, 
  isEndpoint 
}) => {
  return (
    <div className={`
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
    `}>
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <div className="absolute transform rotate-45 w-full h-full bg-white" />
      </div>
      
      {number < 6 && (
        <div className="absolute left-8 -bottom-6 w-0.5 h-6 bg-purple-500" />
      )}
      
      <div className="flex items-start gap-4 relative z-10">
        <div className={`
          flex-shrink-0 w-12 h-12 rounded-xl
          ${isEndpoint
            ? 'bg-white text-indigo-600'
            : 'bg-purple-500 text-white'
          }
          font-bold text-2xl
          flex items-center justify-center
          shadow-md transform -rotate-3
          group-hover:rotate-0 transition-transform duration-300
        `}>
          {number}
        </div>

        <div className="flex-1 pt-1">
          <h3 className={`
            font-bold text-lg mb-0.5
            ${isEndpoint ? 'text-white' : 'text-purple-300'}
            group-hover:text-white transition-colors duration-300
          `}>
            {title}
          </h3>
          <p className={`
            text-sm
            ${isEndpoint ? 'text-purple-100' : 'text-gray-400'}
            group-hover:text-gray-200 transition-colors duration-300
          `}>
            {description}
          </p>
        </div>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className={`
            w-1 h-12 rounded-full
            ${isEndpoint ? 'bg-purple-300' : 'bg-purple-500'}
            opacity-30 group-hover:opacity-50
            transition-opacity duration-300
          `} />
        </div>
      </div>
    </div>
  );
};