import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Connection, GameMode } from '../types/types';
import { validateConcept } from '@/utils/validation';

interface GameState {
  startConcept: string;
  endConcept: string;
  gameMode: GameMode;
  connections: Connection[];
  gameHistory: Connection[][];
  validation: {
    startConcept: boolean;
    endConcept: boolean;
  };
  isLoading: boolean;
  error: string | null;
}

interface GameActions {
  setStartConcept: (concept: string) => void;
  setEndConcept: (concept: string) => void;
  setGameMode: (mode: GameMode) => void;
  setConnections: (connections: Connection[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addToHistory: () => void;
  resetState: () => void;
}

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      // Initial state
      startConcept: '',
      endConcept: '',
      gameMode: 'Classic',
      connections: [],
      gameHistory: [],
      validation: {
        startConcept: true,
        endConcept: true,
      },
      isLoading: false,
      error: null,

      // Actions
      setStartConcept: (concept) => 
        set((state) => ({ 
          startConcept: concept,
          validation: {
            ...state.validation,
            startConcept: validateConcept(concept)
          }
        })),

      setEndConcept: (concept) =>
        set((state) => ({
          endConcept: concept,
          validation: {
            ...state.validation,
            endConcept: validateConcept(concept)
          }
        })),

      setGameMode: (mode) => set({ gameMode: mode }),
      
      setConnections: (connections) => set({ connections }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      addToHistory: () => {
        const { connections } = get();
        if (connections.length > 0) {
          set((state) => ({
            gameHistory: [...state.gameHistory, connections]
          }));
        }
      },

      resetState: () => set({
        connections: [],
        error: null,
        isLoading: false
      })
    }),
    {
      name: 'game-storage',
      partialize: (state) => ({ 
        gameHistory: state.gameHistory,
        gameMode: state.gameMode 
      }),
    }
  )
);
