// pages/index.tsx
import React, { useState } from 'react';
import { ConnectionCardd } from '../components/ConnectionCard/ConnectionCardd';
import ButtonAreaModes from '../components/DiscoverButton/DiscoverGameModes';
import { Connection, GameMode } from '../types/types';
import ClipLoader from 'react-spinners/ClipLoader';
import { sendMessage } from '../services/claude';

export default function ConceptConnector() {
  const [startConcept, setStartConcept] = useState('');
  const [endConcept, setEndConcept] = useState('');
  const [gameMode, setGameMode] = useState<GameMode>('Direct');
  const [connections, setConnections] = useState<Connection[]>([]);
  const [showConnections, setShowConnections] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const handleDiscover = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const parsedConnections = await sendMessage(startConcept, endConcept, gameMode);
      console.log('Parsed Connections:', parsedConnections);

      if (parsedConnections.length === 0) {
        setError('No connections found. Please try different concepts.');
        setShowConnections(false);
      } else {
        setConnections(parsedConnections);
        console.log('Updated Connections:', parsedConnections);
        setShowConnections(true);
      }
    } catch (error) {
      setError('An error occurred while discovering connections.');
      console.error('Error discovering connections:', error);
    } finally {
      setIsLoading(false);
    }
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
        <ButtonAreaModes 
        setGameMode={setGameMode} 
        onDiscover={handleDiscover} 
        startConcept={startConcept} // Pass startConcept
        setStartConcept={setStartConcept} // Pass setStartConcept
        endConcept={endConcept} // Pass endConcept
        setEndConcept={setEndConcept} // Pass setEndConcept
      />

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
              {connections.map((connection, index) => {
                return (
                  <ConnectionCardd
                    key={index}
                    number={index + 1}
                    title={connection.title}
                    description={connection.description}
                    isEndpoint={index === 0 || index === connections.length - 1}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}