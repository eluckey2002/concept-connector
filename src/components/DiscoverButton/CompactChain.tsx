import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Connection } from '../../types/types';
import TextWithIcons from '../ConnectionCard/textWithIcons';

interface CompactChainProps {
  connections: Connection[];
}

const CompactChain: React.FC<CompactChainProps> = ({ connections }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 rounded-xl">
      <div className="flex flex-wrap items-center gap-3">
        {connections.map((connection, index) => (
          <React.Fragment key={index}>
            <div 
              className="relative group"
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className={`
                cursor-pointer px-4 py-2 
                bg-gray-800 border-2 rounded-lg
                shadow-sm hover:shadow-md
                transition-all duration-300 ease-in-out
                transform hover:-translate-y-1
                ${activeStep === index ? 'border-purple-500 ring-2 ring-purple-500/50' : 'border-gray-800'}
              `}>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-purple-300">
                    <TextWithIcons text={connection.title} />
                  </span>
                </div>
              </div>

              {activeStep === index && (
                <div className="absolute z-10 top-full mt-3 left-0 w-72 p-4 
                  bg-gray-800 rounded-lg shadow-xl border border-gray-700
                  transform origin-top transition-all duration-200 ease-out">
                  <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-800 border-t border-l border-gray-700 transform rotate-45" />
                  <div className="flex items-start gap-3">
                    <p className="text-sm text-gray-400 leading-relaxed">
                      <TextWithIcons text={connection.description} />
                    </p>
                  </div>
                </div>
              )}
            </div>

            {index < connections.length - 1 && (
              <div className={`
                flex items-center gap-2 px-2
                text-gray-500 transition-colors duration-300
                ${activeStep === index || activeStep === index + 1 ? 'text-gray-300' : ''}
              `}>
                <span className="text-xs font-medium uppercase tracking-wider">
                  {connection.edge}
                </span>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CompactChain; 