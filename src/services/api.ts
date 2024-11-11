import { Connection, GameMode } from '../types/types';
import { anthropic, APIError, getSystemMessage } from './claude';
import { parseConnectionStatements } from '../transformers/apiResponseTransform';
import { createRateLimiter } from '../utils/rateLimiter';
import { retry } from '../utils/retry';

// Configure rate limiter: 5 requests per minute
const rateLimiter = createRateLimiter(5, 60 * 1000);

export const conceptConnectorAPI = {
  discoverConnections: async (
    startConcept: string,
    endConcept: string,
    gameMode: GameMode,
    signal?: AbortSignal
  ): Promise<Connection[]> => {
    // Check rate limiting
    const rateLimited = !rateLimiter();
    if (rateLimited) {
      throw new APIError('Too many requests. Please try again later.', 'validation');
    }

    // Validate inputs
    if (!startConcept.trim() || !endConcept.trim()) {
      throw new APIError('Start and end concepts are required', 'validation');
    }

    return await retry(async () => {
      try {
        const response = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 500,
          temperature: 0,
          system: await getSystemMessage(),
          messages: [
            {
              role: "user",
              content: `<concept1>${startConcept}</concept1><concept2>${endConcept}</concept2><gameMode>${gameMode}</gameMode>`
            }
          ]
        });

        if (!response.content || response.content[0]?.type !== 'text') {
          throw new APIError('Invalid API response format', 'server');
        }

        const parsedConnections = parseConnectionStatements(response.content[0].text);
        
        if (!Array.isArray(parsedConnections) || parsedConnections.length === 0) {
          throw new APIError('Failed to generate valid connections', 'server');
        }

        return parsedConnections;

      } catch (error) {
        if (error instanceof APIError) throw error;
        
        if (error instanceof Error && error.name === 'AbortError') {
            throw new APIError('Request cancelled', 'network');
          }

        console.error('API Error:', error);
        throw new APIError(
          'Failed to process request',
          'server',
          error instanceof Error && 'status' in error ? (error as any).status : 500
        );
      }
    }, {
      retries: 3,
      backoff: true,
      initialDelay: 1000,
      signal
    });
  }
};
