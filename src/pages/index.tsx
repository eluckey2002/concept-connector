// pages/index.tsx
import React, { useState } from 'react';
import { ConnectionCard } from '../components/ConnectionCard/ConnectionCard';
import CompactChain from '../components/DiscoverButton/CompactChain';
import ButtonAreaModes from '../components/DiscoverGameModes';
import { Connection, GameMode } from '../types/types';
import ClipLoader from 'react-spinners/ClipLoader';
import { conceptConnectorAPI } from '../services/api';
import { APIError } from '../services/claude';
import { useGameStore } from '@/stores/gameStore';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';

export default function ConceptConnector() {
  const {
    connections,
    isLoading,
    error,
    startConcept,
    endConcept,
    gameMode,
    setConnections,
    setLoading,
    setError,
    addToHistory,
    resetState
  } = useGameStore();

  const { defaultConfig } = useAnimationConfig();

  const [useCompactChain, setUseCompactChain] = useState(true);

  const handleDiscover = async () => {
    resetState();
    setLoading(true);
    
    const controller = new AbortController();
    
    try {
      const newConnections = await conceptConnectorAPI.discoverConnections(
        startConcept,
        endConcept,
        gameMode,
        controller.signal
      );
      
      setConnections(newConnections);
      addToHistory();
    } catch (err) {
      if (err instanceof APIError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-xl mx-auto">
        {/* Header with bold styling */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
          <h1 className="text-5xl font-bold mb-3 relative">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
              Concept Connector
            </span>
          </h1>
          <p className="text-purple-300 text-lg">
            Discover fascinating connections between any two ideas
          </p>
        </div>

        {/* Replace Input Section with ButtonAreaModes */}
        <ButtonAreaModes onDiscover={handleDiscover} startConcept={startConcept} endConcept={endConcept} />
     

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center my-4">
            <ClipLoader loading={isLoading} size={50} color="#ffffff" />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {/* Connections Section */}
        {connections.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold px-4"/>            
            <div className="space-y-6">
              {useCompactChain ? (
                <CompactChain connections={connections} />
              ) : (
                connections.map((connection, index) => (
                  <ConnectionCard
                    key={index}
                    number={index + 1}
                    title={connection.title}
                    description={connection.description}
                    isEndpoint={index === 0 || index === connections.length - 1}
                    animationConfig={defaultConfig}
                    index={index}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}