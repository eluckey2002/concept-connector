export const retry = async <T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    backoff?: boolean;
    initialDelay?: number;
    signal?: AbortSignal;
  } = {}
): Promise<T> => {
  const { retries = 3, backoff = true, initialDelay = 1000, signal } = options;

  try {
    if (signal?.aborted) {
      throw new Error('Request aborted');
    }
    return await fn();
  } catch (error) {
    if (retries === 0 || signal?.aborted) throw error;
    
    if (backoff) {
      await new Promise(resolve => 
        setTimeout(resolve, initialDelay * (Math.pow(2, 3 - retries)))
      );
    }
    
    return retry(fn, { 
      retries: retries - 1, 
      backoff, 
      initialDelay,
      signal 
    });
  }
}; 