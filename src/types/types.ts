// /types/types.ts
import { FC, ReactNode, ReactElement, ButtonHTMLAttributes, ElementType } from 'react';

// Define the Connection type separately for reusability
export interface Connection {
  title: string;
  description: string;
  edge: string;
}

export interface TooltipProps {
  /** The content to be displayed in the tooltip */
  content: ReactNode;
  /** The element that triggers the tooltip */
  children: ReactElement;
  /** Position of the tooltip relative to the trigger element */
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export interface IntroductoryCommentary {
    commentary: string;
}

export interface CompletedCommentary {
    commentary: string;    
}

export type ClaudeResponse = 
 {
    introductoryCommentary: IntroductoryCommentary;
    connections: Connection[];
    completedCommentary: CompletedCommentary;
   
}

export interface APIResponse {
    content: Array<{
      type: string;
      text: string;
    }>;
  }
  
  
export type GameMode = 
    | 'Classic' 
    | 'Academic' 
    | 'Historical' 
    | 'Pop Culture' 
    | 'Invention'
    | 'Geographic' 
    | 'Wordplay' 
    | 'Cause & Effect' 
    | 'Metaphor' 
    | 'Conspiracy Theory'
    | 'AI Choice';

export interface GameModeData {
  id: GameMode;
  name: string;
  description: string;
  icon: string;
  isActive?: boolean;
}

export type ButtonVariant = 'primary' | 'secondary' | 'mode' | 'special';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  icon?: ElementType;
  isActive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export interface AnimationConfig {
  initial: {
    opacity: number;
    y: number;
    scale: number;
  };
  animate: {
    opacity: number;
    y: number;
    scale: number;
  };
  transition: {
    duration: number;
    delay: number;
    ease: string;
  };
} 

export interface ValidationState {
  startConcept: boolean;
  endConcept: boolean;
} 