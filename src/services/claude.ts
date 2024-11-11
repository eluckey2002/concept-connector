import Anthropic from "@anthropic-ai/sdk";
import { parseClaudeResponse } from '../transformers/apiResponseTransform';
import { Connection, GameMode } from '../types/types';

// Anthropic client configuration
const getAnthropicApiKey = (): string => {
    return process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "";
 
};

export const anthropic = new Anthropic({
    apiKey: getAnthropicApiKey(),
    dangerouslyAllowBrowser: true
  });

// Load the system prompt from the prompt.txt file
let systemMessage: string | null = null;

export const getSystemMessage = async (): Promise<string> => {
    if (systemMessage) return systemMessage;
  
    try {
      const response = await fetch('/promptGameMode.txt');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      systemMessage = await response.text();
      return systemMessage;
    } catch (error) {
      console.error('Error loading system prompt:', error);
      throw new Error('Failed to load Claude system prompt');
    }
  };

/*// Conversation history management
export let conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [];
export const addToConversationHistory = (role: 'user' | 'assistant', content: string) => {
  conversationHistory.push({ role, content });};
*/

// Send message to claude
export const sendMessage = async (startConcept: string, endConcept: string, gameMode: GameMode): Promise<Connection[]> => {
    try {
      const systemPrompt = await getSystemMessage();  

      console.log("Start Concept:", startConcept);
      console.log("End Concept:", endConcept);
      console.log("Game Mode:", gameMode);  

      // Make API call
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 500,
        temperature: 0,
        system: systemPrompt,
        messages: [
          { role: "user", content: `<concept1>${startConcept}</concept1><concept2>${endConcept}</concept2><gameMode>${gameMode}</gameMode>` }
        ]
      });

      console.log('API Response:', response);

      if (!response.content || response.content[0]?.type !== 'text') {
        console.error('Invalid response format');
        return [];
      }

      const parsedConnections = parseClaudeResponse(response.content[0].text);
      console.log('Response:', response.content[0].text);


      console.log('Parsed Connections:', parsedConnections);
      return parsedConnections;

    } catch (error) {
      console.error('Error in sendMessage:', error);
      return [];
    }
  }

         
