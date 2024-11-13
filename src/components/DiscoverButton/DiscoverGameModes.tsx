import React, { useState } from 'react';
import { Sparkles, Wand2, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/DiscoverButton/tooltip";
import { GameMode } from '../../types/types';
import { InputField } from '../InputField';
import { useGameStore } from '@/stores/gameStore';
import { validateConcept } from '@/utils/validation';

interface ModeButtonProps {
  mode: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ElementType;
  isSpecial?: boolean;
}

interface ButtonAreaModesProps {
  onDiscover: () => void;
}

const ModeButton: React.FC<ModeButtonProps> = ({ 
  mode, 
  isActive, 
  onClick, 
  icon: Icon, 
  isSpecial 
}) => (
  <TooltipProvider delayDuration={300}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={`
            px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-all duration-200
            flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50
            transform hover:scale-105 active:scale-95
            ${isActive 
              ? 'bg-purple-600/30 text-purple-300 border border-purple-500 shadow-lg shadow-purple-500/20' 
              : isSpecial
                ? 'bg-gray-800/50 text-purple-300 border border-purple-500/30 hover:bg-gray-700/80'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700/80'
            }
          `}
          type="button"
        >
          {Icon && <Icon className="w-3.5 h-3.5" />}
          {mode}
        </button>
      </TooltipTrigger>
      <TooltipContent className="border-gray-700">
        <p className="text-sm">{getTooltipContent(mode)}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const getTooltipContent = (mode: string): string => {
  const tooltips: Record<string, string> = {
    'Classic': 'Find straightforward connections between concepts',
    'Academic': 'Forces connections through academic/scientific concepts',
    'Historical': 'Understand connections through cultural contexts',
    'Scientific': 'Discover relationships through scientific principles',
    'Pop Culture': 'Connections must go through movies/TV/music/celebrities',
    'Invention': 'Connections through inventions and technological development, include dates',
    'Geographic': 'Must connect through places and locations',
    'Wordplay': 'Connections through etymology, rhymes, or linguistic relationships and provide (method) at the end of each connections. For example (rhymes) or (etymology)',
    'Cause & Effect': 'Each step must be a direct cause or consequence of the previous',
    'Metaphor': 'Connections through symbolic or metaphorical relationships',
    'Conspiracy Theory': 'Where every connection must be based on real historical facts that conspiracy theorists have twisted into absolutely bonkers (but documented) theories! Let\'s see how deep this rabbit hole goes...',
    'AI Choice': 'Let AI choose the most relevant perspective'
  };
  return tooltips[mode] || 'Select this mode';
};

const ButtonAreaModes: React.FC<ButtonAreaModesProps> = ({ onDiscover }) => {
  const {
    startConcept,
    endConcept,
    gameMode,
    setStartConcept,
    setEndConcept,
    setGameMode
  } = useGameStore();

  const validation = {
    startConcept: !validateConcept(startConcept),
    endConcept: !validateConcept(endConcept),
  };

  const modes: string[] = [
    'Classic', 'Academic', 'Historical', 'Pop Culture', 'Invention',
    'Geographic', 'Wordplay', 'Cause & Effect', 'Metaphor', 'Conspiracy Theory',
    'AI Choice'
  ];

  const handleConceptChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') {
      setStartConcept(value);
    } else {
      setEndConcept(value);
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-2xl mx-auto space-y-8 p-6 font-sans">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl">
          {/* Main interface */}
          <div className="mb-8 flex space-x-4">
            <InputField 
              label="Starting Concept"
              value={startConcept}
              onChange={(e) => handleConceptChange('start', e.target.value)}
              error={validation.startConcept ? 'Invalid input' : undefined}
              aria-invalid={validation.startConcept}
            />
            <InputField 
              label="Ending Concept"
              value={endConcept}
              onChange={(e) => handleConceptChange('end', e.target.value)}
              error={validation.endConcept ? 'Invalid input' : undefined}
              aria-invalid={validation.endConcept}
            />
          </div>

          {/* Mode selection area */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-purple-300 text-sm font-medium">Select Connection Mode</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="focus:outline-none">
                      <Info className="w-4 h-4 text-gray-400 hover:text-purple-400 transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="border-gray-700">
                    <p className="text-sm">Choose how you want to analyze the connection between concepts</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {modes.map((mode) => (
                  <ModeButton
                    key={mode}
                    mode={mode}
                    isActive={mode === gameMode}
                    onClick={() => {
                      setGameMode(mode as GameMode);
                    }}
                  />
                ))}
                
                <ModeButton
                  mode="AI Choice"
                  isActive={gameMode === 'AI Choice'}
                  onClick={() => {
                    setGameMode('AI Choice');
                  }}
                  icon={Sparkles}
                  isSpecial
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={onDiscover}
                disabled={!startConcept || !endConcept}
                className={`flex-1 ${startConcept && endConcept ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-500'} text-white py-3 px-4 rounded-lg 
                  transition-all duration-200 font-medium
                  transform ${startConcept && endConcept ? 'hover:scale-105 active:scale-95' : ''} shadow-lg shadow-purple-600/20
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
              >
                Discover Connection
              </button>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    type="button"
                    className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg 
                      transition-all duration-200 group transform hover:scale-105 active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    <Wand2 className="w-5 h-5 text-purple-400 group-hover:text-purple-300 
                      transition-colors duration-200" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="border-gray-700">
                  <p className="text-sm">Generate random concepts and discover their connection</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ButtonAreaModes;