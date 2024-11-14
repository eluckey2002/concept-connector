import React, { useState } from 'react';
import { Sparkles, Wand2, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/common/tooltip";
import { GameMode } from '../../types/types';
import { InputField } from '@/components/common/InputField';
import { useGameStore } from '@/stores/gameStore';
import { validateConcept } from '@/utils/validation';
import { Button } from '@/components/common/Button';
import { ErrorMessage } from '@/components/DiscoverButton/ErrorMessage';

interface ModeButtonProps {
  mode: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ElementType;
  isSpecial?: boolean;
}

interface ButtonAreaModesProps {
  startConcept: string;
  endConcept: string;
  onDiscover: () => void;
  error?: string;
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
        <Button
          variant={isSpecial ? 'special' : 'mode'}
          onClick={onClick}
          icon={Icon}
          isActive={isActive}
        >
          {mode}
        </Button>
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

const ButtonAreaModes: React.FC<ButtonAreaModesProps> = ({ 
  startConcept, 
  endConcept,
  onDiscover,
  error
}) => {
  const [isDirty, setIsDirty] = useState<{start: boolean, end: boolean}>({
    start: false,
    end: false
  });

  const {
    gameMode,
    setStartConcept,
    setEndConcept,
    setGameMode
  } = useGameStore();

  const validation = {
    startConcept: isDirty.start && !validateConcept(startConcept),
    endConcept: isDirty.end && !validateConcept(endConcept),
  };

  const modes: GameMode[] = [
    'Classic', 'Academic', 'Historical', 'Pop Culture', 'Invention',
    'Geographic', 'Wordplay', 'Cause & Effect', 'Metaphor', 'Conspiracy Theory'
  ];

  const handleConceptChange = (type: 'start' | 'end', value: string) => {
    setIsDirty(prev => ({
      ...prev,
      [type]: true
    }));
    if (type === 'start') {
      setStartConcept(value);
    } else {
      setEndConcept(value);
    }
  };

  const getValidationError = (): string => {
    if (!isDirty.start && !isDirty.end) return ''; // Don't show errors initially
    if (validation.startConcept) return 'Please enter a valid starting concept';
    if (validation.endConcept) return 'Please enter a valid ending concept';
    if (!gameMode) return 'Please select a connection mode';
    return error || '';
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
                    onClick={() => setGameMode(mode)}
                  />
                ))}
                
                <ModeButton
                  mode="AI Choice"
                  isActive={gameMode === 'AI Choice'}
                  onClick={() => setGameMode('AI Choice')}
                  icon={Sparkles}
                  isSpecial
                />
              </div>
            </div>

            {/* Add ErrorMessage component before the action buttons */}
            <ErrorMessage message={getValidationError()} />
            
            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={onDiscover}
                disabled={!startConcept || !endConcept}
                className="flex-1"
              >
                Discover Connection
              </Button>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    icon={Wand2}
                    className="group"
                  >
                    <Wand2 className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  </Button>
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