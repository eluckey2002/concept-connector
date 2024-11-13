import React from 'react';
import TextWithIcons from './textWithIcons';

interface ConnectionCardContentProps {
  number: number;
  title: string;
  description: string;
  isEndpoint: boolean;
}

export const ConnectionCardContent: React.FC<ConnectionCardContentProps> = ({
  number,
  title,
  description,
  isEndpoint,
}) => {
  return (
    <div className="flex items-start gap-4 relative z-10">
      {/* Number Badge */}
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

      {/* Title and Description */}
      <div className="flex-1 pt-0 pr-6">
        <h3 className={`
          text-center
          font-bold text-3xl mb-0.5
          ${isEndpoint ? 'text-white' : 'text-purple-300'}
          group-hover:text-white transition-colors duration-300
        `}>
          <TextWithIcons text={title} />
        </h3>
        <p className={`
          text-center
          text-sm
          ${isEndpoint ? 'text-purple-100' : 'text-gray-400'}
          group-hover:text-gray-200 transition-colors duration-300
        `}>
          <TextWithIcons text={description} />
        </p>
      </div>

      {/* Decorative Line on the Right */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <div className={`
          w-1 h-12 rounded-full
          ${isEndpoint ? 'bg-purple-300' : 'bg-purple-500'}
          opacity-30 group-hover:opacity-50
          transition-opacity duration-300
        `} />
      </div>
    </div>
  );
};
