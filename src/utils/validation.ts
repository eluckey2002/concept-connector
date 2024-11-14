export const validateConcept = (concept?: string): boolean => {
  if (!concept) return false;
  if (!concept.trim()) return false;
  if (concept.length > 100) return false;
  if (/<|>|script|onerror/i.test(concept)) return false;
  return true;
};

export const sanitizeConcept = (concept: string): string => {
  return concept
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 100);
};

// Add rate limiting
export const createRateLimiter = (maxRequests: number, timeWindow: number) => {
  const requests: number[] = [];
  return () => {
    const now = Date.now();
    requests.push(now);
    const recentRequests = requests.filter(time => (now - time) < timeWindow);
    requests.length = recentRequests.length;
    return requests.length <= maxRequests;
  };
};
