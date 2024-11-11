import Anthropic from "@anthropic-ai/sdk";

export class APIError extends Error {
  constructor(
    message: string,
    public type: 'validation' | 'network' | 'server',
    public code?: number
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Anthropic client configuration
const getAnthropicApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new APIError('Anthropic API key not found', 'validation');
  }
  return apiKey;
};

export const anthropic = new Anthropic({
  apiKey: getAnthropicApiKey(),
  dangerouslyAllowBrowser: true
});

// Load the system prompt
let systemMessage: string | null = null;

export const getSystemMessage = async (): Promise<string> => {
  if (systemMessage) return systemMessage;

  try {
    const response = await fetch('/promptGameMode.txt');
    if (!response.ok) {
      throw new APIError(
        `Failed to load system prompt: ${response.statusText}`,
        'network',
        response.status
      );
    }
    systemMessage = await response.text();
    return systemMessage;
  } catch (error) {
    console.error('Error loading system prompt:', error);
    throw new APIError('Failed to load system prompt', 'server');
  }
};

         
